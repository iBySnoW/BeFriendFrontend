"use client"

import { usePathname } from "next/navigation"
import { BottomNavigation } from "@/components/BottomNavigation"

const hideBottomNavigation = (pathname: string) => {
  return ["/onboarding", "/auth"].some((route) => pathname.startsWith(route))
}

export function ClientBottomNavigation() {
  const pathname = usePathname()

  if (hideBottomNavigation(pathname)) {
    return null
  }

  return <BottomNavigation />
}
