import type { Metadata } from "next"
import NotificationList from "@/components/NotificationList"

export const metadata: Metadata = {
  title: "Notifications",
  description: "Vos notifications",
}

export default function NotificationsPage() {
  return (
    <div className="container max-w-md py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <NotificationList />
    </div>
  )
}
