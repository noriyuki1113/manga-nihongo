/** Original, simple illustrated backgrounds. Coordinate space: 360 x 270. */

const PETALS: Array<[number, number, number]> = [
  [34, 40, 18], [82, 92, -24], [148, 28, 32], [196, 74, -8], [250, 38, 20],
  [296, 96, -30], [330, 52, 12], [120, 140, 26], [226, 128, -16], [60, 170, 8],
  [318, 150, 34], [180, 186, -28],
]

function Petals({ opacity = 0.9 }: { opacity?: number }) {
  return (
    <g opacity={opacity}>
      {PETALS.map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={5}
          ry={3}
          fill={i % 3 === 0 ? "#FFB7C5" : "#FFD3DC"}
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
    </g>
  )
}

function SakuraTree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 120 L-4 50 Q0 30 4 50 L6 120 Z" fill="#6B4B45" />
      <g fill="#FFB7C5">
        <circle cx={0} cy={20} r={38} />
        <circle cx={-34} cy={38} r={28} />
        <circle cx={34} cy={36} r={30} />
        <circle cx={-12} cy={-6} r={26} />
        <circle cx={22} cy={-2} r={24} />
      </g>
      <g fill="#FFD3DC">
        <circle cx={-8} cy={10} r={14} />
        <circle cx={26} cy={26} r={12} />
        <circle cx={-34} cy={30} r={10} />
      </g>
    </g>
  )
}

export function SchoolGate() {
  return (
    <g>
      <defs>
        <linearGradient id="sky-gate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BFE3FF" />
          <stop offset="1" stopColor="#FFE9E3" />
        </linearGradient>
      </defs>
      <rect width={360} height={270} fill="url(#sky-gate)" />
      <ellipse cx={80} cy={46} rx={46} ry={12} fill="#fff" opacity={0.75} />
      <ellipse cx={104} cy={38} rx={30} ry={10} fill="#fff" opacity={0.75} />
      <ellipse cx={290} cy={64} rx={40} ry={10} fill="#fff" opacity={0.6} />

      {/* school building */}
      <rect x={150} y={72} width={190} height={124} fill="#F2EDE6" />
      <rect x={150} y={64} width={190} height={12} fill="#C9C2BA" />
      <rect x={228} y={34} width={34} height={36} fill="#E6E0D8" />
      <circle cx={245} cy={50} r={9} fill="#fff" stroke="#9A948C" strokeWidth={2} />
      <path d="M245 50 L245 44 M245 50 L250 52" stroke="#4A4650" strokeWidth={1.6} strokeLinecap="round" />
      {[0, 1, 2, 3].map((i) =>
        [0, 1].map((j) => (
          <rect key={`${i}-${j}`} x={162 + i * 44} y={88 + j * 52} width={30} height={34} rx={2} fill="#9BD0F2" stroke="#fff" strokeWidth={3} />
        )),
      )}
      <rect x={236} y={150} width={28} height={46} fill="#6A7A9B" />

      {/* gate pillars */}
      <rect x={10} y={110} width={26} height={110} fill="#D9D3CB" />
      <rect x={6} y={104} width={34} height={10} fill="#BDB6AD" />
      <rect x={118} y={110} width={26} height={110} fill="#D9D3CB" />
      <rect x={114} y={104} width={34} height={10} fill="#BDB6AD" />
      <rect x={21} y={150} width={8} height={26} fill="#4A4650" opacity={0.85} />

      <SakuraTree x={86} y={74} s={1.15} />
      <SakuraTree x={330} y={78} s={0.9} />

      {/* ground */}
      <path d="M0 214 L360 214 L360 270 L0 270 Z" fill="#DCCFC3" />
      <path d="M0 232 Q180 222 360 232 L360 270 L0 270 Z" fill="#CDBFB2" />
      <Petals />
    </g>
  )
}

function ClassroomBase({
  gradientId,
  wall,
  floor,
  windowSky,
  light,
}: {
  gradientId: string
  wall: string
  floor: string
  windowSky: [string, string]
  light?: string
}) {
  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={windowSky[0]} />
          <stop offset="1" stopColor={windowSky[1]} />
        </linearGradient>
      </defs>
      <rect width={360} height={270} fill={wall} />
      {/* floor */}
      <path d="M0 196 L360 196 L360 270 L0 270 Z" fill={floor} />
      <path d="M0 196 L360 196" stroke="#00000014" strokeWidth={2} />
      {/* windows (left) */}
      <g>
        <rect x={20} y={28} width={132} height={110} rx={4} fill="#F7F3EC" />
        <rect x={28} y={36} width={116} height={94} fill={`url(#${gradientId})`} />
        <path d="M86 36 L86 130 M28 83 L144 83" stroke="#F7F3EC" strokeWidth={5} />
        <SakuraBranch />
      </g>
      {/* blackboard */}
      <rect x={176} y={34} width={160} height={92} rx={4} fill="#C7A77B" />
      <rect x={182} y={40} width={148} height={80} fill="#2F4A44" />
      <text x={256} y={74} textAnchor="middle" fontSize={20} fontWeight={700} fill="#F3F1E6" opacity={0.92}>
        ようこそ
      </text>
      <path d="M204 92 L304 92" stroke="#F3F1E6" strokeWidth={2} strokeLinecap="round" opacity={0.5} />
      <path d="M204 104 L270 104" stroke="#F3F1E6" strokeWidth={2} strokeLinecap="round" opacity={0.35} />
      <rect x={186} y={116} width={140} height={4} fill="#B89A70" />
      {/* desks */}
      <g>
        <rect x={0} y={210} width={150} height={14} rx={3} fill="#C99A6B" />
        <rect x={14} y={224} width={6} height={46} fill="#8A8F9A" />
        <rect x={130} y={224} width={6} height={46} fill="#8A8F9A" />
        <rect x={210} y={214} width={150} height={14} rx={3} fill="#C99A6B" />
        <rect x={224} y={228} width={6} height={42} fill="#8A8F9A" />
        <rect x={340} y={228} width={6} height={42} fill="#8A8F9A" />
      </g>
      {light && <rect width={360} height={270} fill={light} />}
    </g>
  )
}

function SakuraBranch() {
  return (
    <g>
      <path d="M144 44 Q110 54 84 76" stroke="#6B4B45" strokeWidth={4} fill="none" strokeLinecap="round" />
      {[[130, 50], [112, 58], [98, 68], [120, 66], [140, 60], [90, 80]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={9} fill="#FFB7C5" />
          <circle cx={x + 2} cy={y - 2} r={4} fill="#FFD3DC" />
        </g>
      ))}
    </g>
  )
}

export function Classroom() {
  return (
    <g>
      <ClassroomBase gradientId="win-day" wall="#F6EBDD" floor="#DDBF98" windowSky={["#BFE3FF", "#E6F4FF"]} />
      <Petals opacity={0.55} />
    </g>
  )
}

export function ClassroomAfternoon() {
  return (
    <g>
      <ClassroomBase
        gradientId="win-afternoon"
        wall="#F8E6CF"
        floor="#D6B287"
        windowSky={["#FFD9A8", "#FFEFD6"]}
        light="rgba(255,186,110,0.16)"
      />
      <Petals opacity={0.4} />
    </g>
  )
}

export function ClassroomSunset() {
  return (
    <g>
      <ClassroomBase
        gradientId="win-sunset"
        wall="#F3D9C4"
        floor="#C79C78"
        windowSky={["#FF9E7D", "#FFD1A1"]}
        light="rgba(255,120,110,0.2)"
      />
      <Petals opacity={0.5} />
    </g>
  )
}
