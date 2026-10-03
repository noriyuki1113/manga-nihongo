import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { episodes, getEpisode } from "@/content/episodes"
import { MangaReader } from "@/features/manga/manga-reader"

export function generateStaticParams() {
  return episodes.map((e) => ({ episodeId: e.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<"/read/[episodeId]">): Promise<Metadata> {
  const { episodeId } = await params
  const episode = getEpisode(episodeId)
  return { title: episode ? `Episode ${episode.episodeNumber} — ${episode.titleEn}` : "Reader" }
}

export default async function ReadPage({ params }: PageProps<"/read/[episodeId]">) {
  const { episodeId } = await params
  const episode = getEpisode(episodeId)
  if (!episode) notFound()
  return <MangaReader episode={episode} />
}
