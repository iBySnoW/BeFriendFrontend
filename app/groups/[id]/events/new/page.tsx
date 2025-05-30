"use client"

import { EventForm } from "@/components/events/EventForm"
import { ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"

export default function NewEventPage() {
  const { id } = useParams()
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-primary">Nouvel événement</h1>
          <p className="text-textSecondary mt-1">Créez un événement pour ce groupe</p>
        </header>
      </div>
      <div className="p-6 space-y-6">
        <EventForm groupId={id as string} />
      </div>
    </div>
  )
}
