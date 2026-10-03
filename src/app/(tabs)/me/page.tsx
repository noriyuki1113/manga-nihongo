import type { Metadata } from "next"
import { MeScreen } from "@/features/me/me-screen"

export const metadata: Metadata = { title: "Me" }

export default function MePage() {
  return <MeScreen />
}
