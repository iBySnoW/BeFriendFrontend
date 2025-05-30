"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Calendar, CreditCard, Users } from "lucide-react"
import { getUserNotifications, markNotificationAsRead } from "@/app/actions/notification-actions"

interface Notification {
  id: number
  title: string
  content: string
  type: string
  is_read: boolean
  related_group_id?: number
  related_event_id?: number
  related_expense_id?: number
  related_pool_id?: number
  created_at: string
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true)
        const result = await getUserNotifications()
        if (result.success) {
          setNotifications(result.notifications)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [])

  const handleNotificationClick = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, is_read: true } : notification,
        ),
      )
    } catch (error) {
      console.error("Erreur lors du marquage de la notification comme lue:", error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event_invitation":
        return <Calendar className="h-5 w-5 text-primary" />
      case "group_invitation":
        return <Users className="h-5 w-5 text-primary" />
      case "expense_added":
        return <CreditCard className="h-5 w-5 text-primary" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  const getNotificationLink = (notification: Notification) => {
    if (notification.related_event_id) {
      return `/events/${notification.related_event_id}`
    }
    if (notification.related_group_id) {
      return `/groups/${notification.related_group_id}`
    }
    if (notification.related_expense_id) {
      // Si nous avons à la fois un événement et une dépense, nous allons vers la dépense de l'événement
      if (notification.related_event_id) {
        return `/events/${notification.related_event_id}/expenses`
      }
      // Sinon, nous allons vers la dépense du groupe
      if (notification.related_group_id) {
        return `/groups/${notification.related_group_id}/expenses`
      }
    }
    if (notification.related_pool_id) {
      // Si nous avons à la fois un événement et une cagnotte, nous allons vers la cagnotte de l'événement
      if (notification.related_event_id) {
        return `/events/${notification.related_event_id}/pools`
      }
      // Sinon, nous allons vers la cagnotte du groupe
      if (notification.related_group_id) {
        return `/groups/${notification.related_group_id}/pools`
      }
    }
    return "/notifications"
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des notifications...</p>
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Aucune notification pour le moment</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Link
          key={notification.id}
          href={getNotificationLink(notification)}
          onClick={() => handleNotificationClick(notification.id)}
        >
          <Card
            className={`befriend-card hover:shadow-medium transition-shadow ${
              !notification.is_read ? "border-l-4 border-l-primary" : ""
            }`}
          >
            <CardContent className="p-4 flex items-start">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback className="bg-primary/10">{getNotificationIcon(notification.type)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className={`font-medium ${!notification.is_read ? "text-primary" : ""}`}>{notification.title}</h3>
                <p className="text-sm text-muted-foreground">{notification.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
