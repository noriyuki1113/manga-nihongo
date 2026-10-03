import type { ComponentType } from "react"
import { CharacterBust } from "./character-bust"
import { Classroom, ClassroomAfternoon, ClassroomSunset, SchoolGate } from "./backgrounds"
import type { CharacterSide, Scene } from "@/types"

const BACKGROUNDS: Record<string, ComponentType> = {
  "school-gate": SchoolGate,
  classroom: Classroom,
  "classroom-afternoon": ClassroomAfternoon,
  "classroom-sunset": ClassroomSunset,
}

const SLOT: Record<CharacterSide, { x: number; flip: boolean }> = {
  left: { x: 8, flip: false },
  right: { x: 192, flip: true },
  center: { x: 100, flip: false },
}

const SCALE = 0.8
const BUST_H = 240 * SCALE

type Props = {
  scene: Scene
  className?: string
}

/**
 * Renders a manga panel. If `scene.image` is a path, a raster image is used;
 * otherwise the built-in SVG illustration is drawn. Replace the registry
 * entries (or set image paths) to swap in final artwork.
 */
export function SceneArt({ scene, className }: Props) {
  const image = scene.image ?? "classroom"
  const isUrl = image.startsWith("/") || image.startsWith("http")
  const Background = BACKGROUNDS[image] ?? Classroom

  return (
    <svg
      viewBox="0 0 360 270"
      role="img"
      aria-label={`Illustration for scene ${scene.order}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {isUrl ? (
        <image href={image} width={360} height={270} preserveAspectRatio="xMidYMid slice" />
      ) : (
        <Background />
      )}
      {scene.characters?.map((c) => {
        const slot = SLOT[c.side]
        return (
          <CharacterBust
            key={c.characterId}
            characterId={c.characterId}
            pose={c.pose}
            x={slot.x}
            y={270 - BUST_H + 6}
            scale={SCALE}
            flip={slot.flip}
          />
        )
      })}
    </svg>
  )
}
