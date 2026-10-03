"use client"

import { forwardRef } from "react"
import { SceneArt } from "@/features/manga/art/scene-art"
import { SpeechBubble } from "@/features/manga/speech-bubble"
import type { FuriganaMode, Scene } from "@/types"

type Props = {
  scene: Scene
  total: number
  mode: FuriganaMode
  onExpressionTap: (expressionId: string) => void
  children?: React.ReactNode
}

/** One manga panel: illustration on top, dialogue below. */
export const ScenePanel = forwardRef<HTMLElement, Props>(function ScenePanel(
  { scene, total, mode, onExpressionTap, children },
  ref,
) {
  return (
    <section
      ref={ref}
      id={`scene-${scene.order}`}
      aria-label={`Scene ${scene.order} of ${total}`}
      className="animate-pop-in scroll-mt-[calc(var(--safe-top)+var(--reader-top,74px))]"
    >
      <div className="overflow-hidden rounded-[26px] ring-2 ring-white/15">
        <SceneArt scene={scene} className="block aspect-[4/3.1] w-full" />
      </div>
      <div className="mt-4 flex flex-col gap-3.5 px-0.5">
        {scene.dialogues.map((d) => (
          <SpeechBubble key={d.id} dialogue={d} mode={mode} onExpressionTap={onExpressionTap} />
        ))}
      </div>
      {children}
    </section>
  )
})
