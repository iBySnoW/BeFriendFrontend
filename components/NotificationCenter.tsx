"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Notification {
  id: string
  title: string
  message: string
  type: "event" | "group" | "message"
  timestamp: Date
  read: boolean
  groupId?: string
  eventId?: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Nouvel événement",
      message: "Les cours à l'ECV a été créé",
      type: "event",
      timestamp: new Date(),
      read: false,
      groupId: "123",
      eventId: "456",
    },
    {
      id: "2",
      title: "Nouveau message",
      message: "John a envoyé un message dans le groupe ECV",
      type: "message",
      timestamp: new Date(),
      read: false,
      groupId: "789",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative bg-white/10 text-white hover:bg-white/20">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-white text-primary-500"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="wireframe-gradient border-l-white/20">
        <SheetHeader>
          <SheetTitle className="text-white">Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg wireframe-card ${notification.read ? "opacity-60" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <Link
                  href={
                    notification.type === "event"
                      ? `/groups/${notification.groupId}/events/${notification.eventId}`
                      : notification.type === "group"
                        ? `/groups/${notification.groupId}`
                        : "/"
                  }
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{notification.title}</h3>
                    <span className="text-xs text-white/60">
                      {notification.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-white/80">{notification.message}</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  )
}
