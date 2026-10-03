import { BottomNav } from "@/components/layout/bottom-nav"

export default function TabsLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main
        className="px-5"
        style={{
          paddingTop: "calc(var(--safe-top) + 20px)",
          paddingBottom: "calc(var(--nav-h) + var(--safe-bottom) + 28px)",
        }}
      >
        {children}
      </main>
      <BottomNav />
    </>
  )
}
