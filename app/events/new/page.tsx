"use client"

import { EventForm } from "@/components/events/EventForm"

export default function NewEventPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-primary">Créer un événement</h1>
          <p className="text-textSecondary mt-1">Planifiez un nouvel événement</p>
        </header>
        <EventForm />
      </div>
    </div>
  )
}
