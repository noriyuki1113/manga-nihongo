import type { Metadata } from "next"
import { StoriesScreen } from "@/features/stories/stories-screen"

export const metadata: Metadata = { title: "Stories" }

export default function StoriesPage() {
  return <StoriesScreen />
}
