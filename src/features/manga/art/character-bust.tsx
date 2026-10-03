import type { CharacterPose } from "@/types"

type Props = {
  characterId: string
  pose: CharacterPose
  /** x, y in the parent SVG's coordinate space. */
  x: number
  y: number
  scale?: number
  flip?: boolean
}

const SKIN = "#FFE2CF"
const SKIN_SHADE = "#F6C9B0"

type Palette = {
  hair: string
  hairShade: string
  iris: string
  jacket: string
  jacketShade: string
  tie: string
}

const PALETTES: Record<string, Palette> = {
  alex: {
    hair: "#B9824E",
    hairShade: "#97663A",
    iris: "#4F8FB8",
    jacket: "#2B3A5C",
    jacketShade: "#202C47",
    tie: "#FF6B81",
  },
  yuki: {
    hair: "#3B2A33",
    hairShade: "#2A1C24",
    iris: "#7A4B3A",
    jacket: "#3A4E7A",
    jacketShade: "#2C3C61",
    tie: "#6EE7C8",
  },
}

function Brows({ pose }: { pose: CharacterPose }) {
  const stroke = { stroke: "#4A3340", strokeWidth: 3.2, strokeLinecap: "round" as const, fill: "none" }
  switch (pose) {
    case "nervous":
      return (
        <g {...stroke}>
          <path d="M64 88 Q76 84 90 90" />
          <path d="M110 90 Q124 84 136 88" />
        </g>
      )
    case "surprised":
      return (
        <g {...stroke}>
          <path d="M66 80 Q77 74 90 80" />
          <path d="M110 80 Q123 74 134 80" />
        </g>
      )
    case "thinking":
      return (
        <g {...stroke}>
          <path d="M66 88 Q77 85 90 88" />
          <path d="M110 80 Q123 74 134 82" />
        </g>
      )
    default:
      return (
        <g {...stroke}>
          <path d="M66 86 Q77 82 90 86" />
          <path d="M110 86 Q123 82 134 86" />
        </g>
      )
  }
}

function Eyes({ pose, iris }: { pose: CharacterPose; iris: string }) {
  if (pose === "happy") {
    return (
      <g stroke="#4A3340" strokeWidth={3.6} strokeLinecap="round" fill="none">
        <path d="M66 112 Q78 98 90 112" />
        <path d="M110 112 Q122 98 134 112" />
      </g>
    )
  }
  const big = pose === "surprised"
  const ry = big ? 15 : 13
  const irisRy = big ? 10 : 11
  const eye = (cx: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={110} rx={11.5} ry={ry} fill="#fff" />
      <ellipse cx={cx} cy={111} rx={big ? 7 : 8.5} ry={irisRy} fill={iris} />
      <ellipse cx={cx} cy={112} rx={big ? 3.6 : 4.6} ry={big ? 5 : 6.2} fill="#1B1620" />
      <circle cx={cx - 3} cy={105} r={3.2} fill="#fff" />
      <circle cx={cx + 3} cy={116} r={1.6} fill="#fff" opacity={0.9} />
      <path
        d={`M${cx - 12} ${108 - (ry - 13)} Q${cx} ${97 - (ry - 13)} ${cx + 12} ${108 - (ry - 13)}`}
        stroke="#4A3340"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  )
  return (
    <g>
      {eye(78)}
      {eye(122)}
    </g>
  )
}

function Mouth({ pose }: { pose: CharacterPose }) {
  switch (pose) {
    case "smile":
      return <path d="M88 142 Q100 152 112 142" stroke="#B5535F" strokeWidth={3} strokeLinecap="round" fill="none" />
    case "happy":
      return (
        <g>
          <path d="M86 140 Q100 158 114 140 Z" fill="#B5535F" />
          <path d="M91 148 Q100 154 109 148 Q100 151 91 148 Z" fill="#FF9AA8" />
        </g>
      )
    case "surprised":
      return <ellipse cx={100} cy={146} rx={6} ry={8} fill="#B5535F" />
    case "nervous":
      return <path d="M89 147 Q94 142 100 147 Q106 152 111 147" stroke="#B5535F" strokeWidth={3} strokeLinecap="round" fill="none" />
    case "thinking":
      return <path d="M92 146 L108 144" stroke="#B5535F" strokeWidth={3} strokeLinecap="round" />
    default:
      return <path d="M92 144 Q100 148 108 144" stroke="#B5535F" strokeWidth={3} strokeLinecap="round" fill="none" />
  }
}

function AlexHair({ p }: { p: Palette }) {
  return (
    <g>
      <path
        d="M42 112 C32 58 66 24 102 26 C142 24 170 58 158 112 C152 90 142 76 124 70 C112 82 90 80 78 68 C62 78 50 92 42 112 Z"
        fill={p.hair}
      />
      <path d="M70 40 C78 26 92 22 104 24 C94 32 88 42 86 54 C80 50 74 46 70 40 Z" fill={p.hairShade} />
      <path d="M126 36 C140 36 152 46 156 58 C146 54 138 54 132 58 C132 50 130 42 126 36 Z" fill={p.hairShade} />
      <path d="M96 22 C100 12 112 8 120 12 C114 16 112 22 112 28 Z" fill={p.hair} />
    </g>
  )
}

function YukiHairBack({ p }: { p: Palette }) {
  return (
    <path
      d="M38 112 C30 50 68 22 100 22 C134 22 172 50 162 116 C166 150 160 172 152 184 L48 184 C40 172 34 150 38 112 Z"
      fill={p.hairShade}
    />
  )
}

function YukiHairFront({ p }: { p: Palette }) {
  return (
    <g>
      <path
        d="M48 108 C50 58 80 40 100 40 C122 40 152 58 152 108 C142 88 128 76 110 72 C104 84 94 82 90 72 C72 76 56 90 48 108 Z"
        fill={p.hair}
      />
      <path d="M52 112 C48 130 48 150 54 168 C60 150 62 130 62 108 Z" fill={p.hair} />
      <path d="M148 112 C152 130 152 150 146 168 C140 150 138 130 138 108 Z" fill={p.hair} />
      <g transform="rotate(-18 128 58)">
        <rect x={118} y={52} width={22} height={9} rx={4.5} fill="#6EE7C8" />
        <rect x={122} y={54} width={6} height={3} rx={1.5} fill="#fff" opacity={0.7} />
      </g>
    </g>
  )
}

export function CharacterBust({ characterId, pose, x, y, scale = 1, flip = false }: Props) {
  const p = PALETTES[characterId] ?? PALETTES.alex
  const isYuki = characterId === "yuki"
  const transform = `translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})${flip ? " translate(-200 0)" : ""}`

  return (
    <g transform={transform}>
      {isYuki && <YukiHairBack p={p} />}

      {/* shoulders + jacket */}
      <path d="M12 240 C12 192 50 172 100 172 C150 172 188 192 188 240 Z" fill={p.jacket} />
      <path d="M12 240 C12 214 22 198 40 188 C34 206 36 224 40 240 Z" fill={p.jacketShade} />
      {/* neck */}
      <rect x={86} y={146} width={28} height={32} rx={10} fill={SKIN_SHADE} />
      {/* shirt + tie */}
      <path d="M78 174 L100 206 L122 174 Q100 168 78 174 Z" fill="#fff" />
      <path d="M94 186 L106 186 L110 214 L100 222 L90 214 Z" fill={p.tie} />

      {/* ears */}
      <circle cx={49} cy={116} r={9} fill={SKIN} />
      <circle cx={151} cy={116} r={9} fill={SKIN} />
      {/* head */}
      <ellipse cx={100} cy={106} rx={52} ry={56} fill={SKIN} />

      {isYuki ? <YukiHairFront p={p} /> : <AlexHair p={p} />}

      <Brows pose={pose} />
      <Eyes pose={pose} iris={p.iris} />
      {/* nose + blush */}
      <path d="M99 126 Q101 129 103 127" stroke="#D9967C" strokeWidth={2} strokeLinecap="round" fill="none" />
      <ellipse cx={62} cy={130} rx={9} ry={5.5} fill="#FF8FA0" opacity={pose === "nervous" || pose === "happy" ? 0.5 : 0.28} />
      <ellipse cx={138} cy={130} rx={9} ry={5.5} fill="#FF8FA0" opacity={pose === "nervous" || pose === "happy" ? 0.5 : 0.28} />
      <Mouth pose={pose} />

      {pose === "nervous" && (
        <g>
          <path d="M158 70 Q166 84 158 92 Q150 84 158 70 Z" fill="#9AD8F2" />
          <circle cx={156} cy={86} r={2} fill="#fff" opacity={0.8} />
        </g>
      )}
      {pose === "thinking" && (
        <g fill="#FF6B81">
          <circle cx={160} cy={62} r={2.6} />
          <circle cx={168} cy={50} r={3.8} />
          <circle cx={178} cy={34} r={5.4} />
        </g>
      )}
    </g>
  )
}
