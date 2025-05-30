"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { GlobalSearch } from "@/components/GlobalSearch"
import { EventFilters } from "@/components/EventFilters"

const todayEvents = [
  { id: 1, name: "Réunion d'équipe", time: "10:00 - 11:00", group: "Travail" },
  { id: 2, name: "Déjeuner avec Alice", time: "12:30 - 13:30", group: "Amis" },
  { id: 3, name: "Cours de yoga", time: "18:00 - 19:00", group: "Personnel" },
]

export default function TodayPage() {
  const [filteredEvents, setFilteredEvents] = useState(todayEvents)

  const handleFilterChange = (filters: { date?: Date; group?: string }) => {
    // Implement actual filtering logic here
    console.log("Filters applied:", filters)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-4 space-y-6"
    >
      <h1 className="text-2xl font-bold">Aujourd'hui</h1>

      <GlobalSearch />

      <EventFilters onFilterChange={handleFilterChange} />

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="flex items-center p-4">
              <Calendar className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.time} • {event.group}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
