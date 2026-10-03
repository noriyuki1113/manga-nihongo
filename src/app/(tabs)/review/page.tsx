import type { Metadata } from "next"
import { ReviewScreen } from "@/features/review/review-screen"

export const metadata: Metadata = { title: "Review" }

export default function ReviewPage() {
  return <ReviewScreen />
}
