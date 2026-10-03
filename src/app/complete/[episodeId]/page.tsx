import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { episodes, getEpisode } from "@/content/episodes"
import { EpisodeComplete } from "@/features/episode/episode-complete"

export const metadata: Metadata = { title: "Episode Complete" }

export function generateStaticParams() {
  return episodes.map((e) => ({ episodeId: e.id }))
}

export const dynamicParams = false

export default async function CompletePage({ params }: PageProps<"/complete/[episodeId]">) {
  const { episodeId } = await params
  const episode = getEpisode(episodeId)
  if (!episode) notFound()
  return <EpisodeComplete episode={episode} />
}
