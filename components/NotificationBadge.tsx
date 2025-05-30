"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getUnreadNotificationsCount } from "@/app/actions/notification-actions"

export default function NotificationBadge() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function loadCount() {
      try {
        const result = await getUnreadNotificationsCount()
        if (result.success) {
          setCount(result.count)
        }
      } catch (error) {
        console.error("Erreur lors du chargement du nombre de notifications:", error)
      }
    }

    loadCount()

    // Rafraîchir le compteur toutes les minutes
    const interval = setInterval(loadCount, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Link href="/notifications">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </Button>
    </Link>
  )
}
