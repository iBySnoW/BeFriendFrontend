"use client"
import { BottomNavigation } from "@/components/BottomNavigation"
import { usePathname } from "next/navigation"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideBottomNav = pathname.startsWith("/auth") || pathname.startsWith("/onboarding")

  return (
    <div className="flex flex-col min-h-screen">
      <div className={`flex-1 min-h-0 overflow-y-auto ${hideBottomNav ? "" : "min-h-[calc(100vh+64px)]"}`}>
        {children}
      </div>
      {!hideBottomNav && <BottomNavigation />}
    </div>
  )
}
