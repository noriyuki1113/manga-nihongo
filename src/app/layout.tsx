import type { Metadata, Viewport } from "next"
import { ServiceWorkerRegister } from "@/components/layout/service-worker-register"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "Manga Nihongo", template: "%s · Manga Nihongo" },
  description:
    "Stories that teach real Japanese. Read manga, tap the phrases, and learn how people actually talk.",
  applicationName: "Manga Nihongo",
  appleWebApp: {
    capable: true,
    title: "Manga Nihongo",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0D12",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh">
        <div className="relative mx-auto min-h-dvh w-full max-w-[480px]">{children}</div>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
