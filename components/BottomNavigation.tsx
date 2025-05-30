"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-transparent backdrop-blur-lg flex justify-around items-center h-[64px]">
      <Link href="/" className={cn(
        "flex flex-col items-center gap-1 px-2 py-1 transition",
        pathname === "/" ? "text-primary" : "text-muted-foreground"
      )}>
        <Home className="w-6 h-6" />
        <span className="text-xs font-medium">Accueil</span>
      </Link>
      <Link href="/groups" className={cn(
        "flex flex-col items-center gap-1 px-2 py-1 transition",
        pathname === "/groups" ? "text-primary" : "text-muted-foreground"
      )}>
        <Users className="w-6 h-6" />
        <span className="text-xs font-medium">Groupes</span>
      </Link>
      <Link href="/events" className={cn(
        "flex flex-col items-center gap-1 px-2 py-1 transition",
        pathname === "/events" ? "text-primary" : "text-muted-foreground"
      )}>
        <Calendar className="w-6 h-6" />
        <span className="text-xs font-medium">Événements</span>
      </Link>
      <Link href="/profile" className={cn(
        "flex flex-col items-center gap-1 px-2 py-1 transition",
        pathname === "/profile" ? "text-primary" : "text-muted-foreground"
      )}>
        <User className="w-6 h-6" />
        <span className="text-xs font-medium">Profil</span>
      </Link>
    </nav>
  )
}
