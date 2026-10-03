"use client"

import { useSyncExternalStore } from "react"
import { DEFAULT_EPISODE_ID } from "@/content/episodes"
import { nextStreak, toDateKey } from "@/lib/date"
import { localStorageAdapter, type StorageAdapter } from "@/lib/storage"
import { XP, xpKey } from "@/lib/xp"
import type {
  FuriganaMode,
  ProgressState,
  ReviewResult,
  StoryChoiceResult,
} from "@/types"

export const STORAGE_KEY = "manga-nihongo:progress:v1"

export const DEFAULT_STATE: ProgressState = {
  version: 1,
  currentEpisode: DEFAULT_EPISODE_ID,
  currentScene: 0,
  episodeCompleted: {},
  openedExpressionIds: [],
  learnedExpressionIds: [],
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  furiganaMode: "beginner",
  reviewResults: {},
  storyChoiceResult: null,
  xpAwarded: [],
  hasSeenTapGuide: false,
}

/* ------------------------------------------------------------------ */
/* Parsing — never trust persisted data                                */
/* ------------------------------------------------------------------ */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function stringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []
}

function nonNegInt(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.floor(v) : fallback
}

const FURIGANA_MODES: FuriganaMode[] = ["beginner", "standard", "immersion"]

export function parseProgress(raw: unknown): ProgressState {
  if (!isRecord(raw)) return DEFAULT_STATE

  const completed: Record<string, boolean> = {}
  if (isRecord(raw.episodeCompleted)) {
    for (const [k, v] of Object.entries(raw.episodeCompleted)) {
      if (v === true) completed[k] = true
    }
  }

  const reviewResults: Record<string, ReviewResult> = {}
  if (isRecord(raw.reviewResults)) {
    for (const [k, v] of Object.entries(raw.reviewResults)) {
      if (isRecord(v) && typeof v.selectedOptionId === "string" && typeof v.correct === "boolean") {
        reviewResults[k] = { selectedOptionId: v.selectedOptionId, correct: v.correct }
      }
    }
  }

  let storyChoiceResult: StoryChoiceResult | null = null
  const c = raw.storyChoiceResult
  if (
    isRecord(c) &&
    typeof c.challengeId === "string" &&
    typeof c.selectedOptionId === "string" &&
    typeof c.correct === "boolean"
  ) {
    storyChoiceResult = {
      challengeId: c.challengeId,
      selectedOptionId: c.selectedOptionId,
      correct: c.correct,
    }
  }

  return {
    version: 1,
    currentEpisode:
      typeof raw.currentEpisode === "string" ? raw.currentEpisode : DEFAULT_STATE.currentEpisode,
    currentScene: nonNegInt(raw.currentScene, 0),
    episodeCompleted: completed,
    openedExpressionIds: stringArray(raw.openedExpressionIds),
    learnedExpressionIds: stringArray(raw.learnedExpressionIds),
    xp: nonNegInt(raw.xp, 0),
    streak: nonNegInt(raw.streak, 0),
    lastStudyDate: typeof raw.lastStudyDate === "string" ? raw.lastStudyDate : null,
    furiganaMode: FURIGANA_MODES.includes(raw.furiganaMode as FuriganaMode)
      ? (raw.furiganaMode as FuriganaMode)
      : DEFAULT_STATE.furiganaMode,
    reviewResults,
    storyChoiceResult,
    xpAwarded: stringArray(raw.xpAwarded),
    hasSeenTapGuide: raw.hasSeenTapGuide === true,
  }
}

/* ------------------------------------------------------------------ */
/* Pure transitions (easy to test, easy to port to a server later)     */
/* ------------------------------------------------------------------ */

function touchStudy(s: ProgressState, now: Date): ProgressState {
  const streak = nextStreak(s.streak, s.lastStudyDate, now)
  return { ...s, streak, lastStudyDate: toDateKey(now) }
}

/** Grants XP once per key. */
function award(s: ProgressState, key: string, amount: number): ProgressState {
  if (s.xpAwarded.includes(key)) return s
  return { ...s, xp: s.xp + amount, xpAwarded: [...s.xpAwarded, key] }
}

function addUnique(list: string[], ...ids: string[]): string[] {
  const next = [...list]
  for (const id of ids) if (!next.includes(id)) next.push(id)
  return next
}

export const transitions = {
  startEpisode(s: ProgressState, episodeId: string, restart: boolean): ProgressState {
    if (s.currentEpisode === episodeId && !restart) return s
    return {
      ...s,
      currentEpisode: episodeId,
      currentScene: restart || s.currentEpisode !== episodeId ? 0 : s.currentScene,
    }
  },

  revealScene(s: ProgressState, index: number, now: Date): ProgressState {
    if (index <= s.currentScene) return s
    return touchStudy({ ...s, currentScene: index }, now)
  },

  openExpression(s: ProgressState, id: string, now: Date): ProgressState {
    const opened = { ...s, openedExpressionIds: addUnique(s.openedExpressionIds, id) }
    return touchStudy(award(opened, xpKey.expression(id), XP.expressionOpened), now)
  },

  learnExpression(s: ProgressState, id: string): ProgressState {
    return { ...s, learnedExpressionIds: addUnique(s.learnedExpressionIds, id) }
  },

  answerStoryChoice(
    s: ProgressState,
    result: StoryChoiceResult,
    xpReward: number,
    now: Date,
  ): ProgressState {
    let next: ProgressState = { ...s, storyChoiceResult: result }
    if (result.correct) next = award(next, xpKey.choice(result.challengeId), xpReward)
    return touchStudy(next, now)
  },

  completeEpisode(
    s: ProgressState,
    episodeId: string,
    expressionIds: string[],
    xpReward: number,
    now: Date,
  ): ProgressState {
    const next: ProgressState = {
      ...s,
      episodeCompleted: { ...s.episodeCompleted, [episodeId]: true },
      learnedExpressionIds: addUnique(s.learnedExpressionIds, ...expressionIds),
    }
    return touchStudy(award(next, xpKey.episode(episodeId), xpReward), now)
  },

  answerReview(
    s: ProgressState,
    questionId: string,
    result: ReviewResult,
    xpReward: number,
    now: Date,
  ): ProgressState {
    let next: ProgressState = {
      ...s,
      reviewResults: { ...s.reviewResults, [questionId]: result },
    }
    if (result.correct) next = award(next, xpKey.review(questionId), xpReward)
    return touchStudy(next, now)
  },

  resetReview(s: ProgressState): ProgressState {
    return { ...s, reviewResults: {} }
  },

  setFuriganaMode(s: ProgressState, mode: FuriganaMode): ProgressState {
    return { ...s, furiganaMode: mode }
  },

  markTapGuideSeen(s: ProgressState): ProgressState {
    return s.hasSeenTapGuide ? s : { ...s, hasSeenTapGuide: true }
  },

  showTapGuideAgain(s: ProgressState): ProgressState {
    return { ...s, hasSeenTapGuide: false }
  },
}

/* ------------------------------------------------------------------ */
/* Store (external store for useSyncExternalStore)                     */
/* ------------------------------------------------------------------ */

let adapter: StorageAdapter = localStorageAdapter
let state: ProgressState = DEFAULT_STATE
let hydrated = false
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return
  hydrated = true
  state = parseProgress(adapter.read(STORAGE_KEY))
}

function update(fn: (s: ProgressState) => ProgressState) {
  hydrate()
  const next = fn(state)
  if (next === state) return
  state = next
  adapter.write(STORAGE_KEY, state)
  emit()
}

function onStorageEvent(e: StorageEvent) {
  if (e.key !== STORAGE_KEY) return
  state = parseProgress(adapter.read(STORAGE_KEY))
  emit()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", onStorageEvent)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", onStorageEvent)
    }
  }
}

function getSnapshot(): ProgressState {
  hydrate()
  return state
}

function getServerSnapshot(): ProgressState {
  return DEFAULT_STATE
}

/** Replace the persistence backend (e.g. Supabase) — must be called before first render. */
export function configureStorage(next: StorageAdapter) {
  adapter = next
  hydrated = false
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

const noopSubscribe = () => () => {}

/** False during SSR and the hydration pass, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
}

export const progressActions = {
  startEpisode: (episodeId: string, restart = false) =>
    update((s) => transitions.startEpisode(s, episodeId, restart)),
  revealScene: (index: number) =>
    update((s) => transitions.revealScene(s, index, new Date())),
  openExpression: (id: string) =>
    update((s) => transitions.openExpression(s, id, new Date())),
  learnExpression: (id: string) => update((s) => transitions.learnExpression(s, id)),
  answerStoryChoice: (result: StoryChoiceResult, xpReward: number) =>
    update((s) => transitions.answerStoryChoice(s, result, xpReward, new Date())),
  completeEpisode: (episodeId: string, expressionIds: string[], xpReward: number) =>
    update((s) =>
      transitions.completeEpisode(s, episodeId, expressionIds, xpReward, new Date()),
    ),
  answerReview: (questionId: string, result: ReviewResult, xpReward: number) =>
    update((s) => transitions.answerReview(s, questionId, result, xpReward, new Date())),
  resetReview: () => update(transitions.resetReview),
  setFuriganaMode: (mode: FuriganaMode) =>
    update((s) => transitions.setFuriganaMode(s, mode)),
  markTapGuideSeen: () => update(transitions.markTapGuideSeen),
  showTapGuideAgain: () => update(transitions.showTapGuideAgain),
  resetAll: () => {
    hydrate()
    state = DEFAULT_STATE
    adapter.remove(STORAGE_KEY)
    emit()
  },
}
