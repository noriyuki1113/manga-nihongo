import type { Episode } from "@/types"
import { tokyoDaysEp1 } from "./tokyo-days-ep1"

export const episodes: Episode[] = [tokyoDaysEp1]

export const DEFAULT_EPISODE_ID = tokyoDaysEp1.id

export function getEpisode(id: string): Episode | undefined {
  return episodes.find((e) => e.id === id)
}

export { catalog, STORY_TITLE } from "./catalog"
