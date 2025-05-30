"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EventGridCard } from "@/components/EventGridCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  { id: 1, name: "Anniv. de Marie", start_date: "2024-06-15T00:00:00.000Z", group: "Famille", color: "bg-primary/10" },
  { id: 2, name: "Soirée jeux", start_date: "2024-06-22T00:00:00.000Z", group: "Amis proches", color: "bg-secondary/10" },
  { id: 3, name: "Réunion d'équipe", start_date: "2024-07-01T00:00:00.000Z", group: "Collègues", color: "bg-primary/10" },
  { id: 4, name: "Tournoi de tennis", start_date: "2024-07-08T00:00:00.000Z", group: "Club de sport", color: "bg-secondary/10" },
  { id: 5, name: "Dîner de Noël", start_date: "2024-12-24T00:00:00.000Z", group: "Famille", color: "bg-primary/10" },
  { id: 6, name: "Barbecue", start_date: "2024-05-15T00:00:00.000Z", group: "Amis proches", color: "bg-secondary/10" },
]

// Fonction utilitaire pour savoir si un événement est à venir
function isUpcoming(event: { start_date: string }) {
  const eventDate = new Date(event.start_date)
  const now = new Date()
  eventDate.setHours(0,0,0,0)
  now.setHours(0,0,0,0)
  return eventDate >= now
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <div className="p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-foreground font-fredoka tracking-tight">Événements</h1>
          <Link href="/events/new" aria-label="Créer un nouvel événement">
            <Button className="rounded-full w-12 h-12 p-0 befriend-gradient shadow-lg focus:ring-2 focus:ring-primary focus:outline-none transition" aria-label="Créer un événement">
              <Plus className="h-6 w-6 text-white" />
            </Button>
          </Link>
        </header>

        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un événement..."
              className="bg-background text-foreground border border-border rounded-full px-4 py-3 w-full pl-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher un événement"
            />
          </div>
          <Button variant="outline" className="rounded-full aspect-square p-0 w-12 h-12 border-border shadow focus:ring-2 focus:ring-primary focus:outline-none transition" aria-label="Filtrer les événements">
            <Filter className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-card shadow-md">
            <TabsTrigger value="upcoming" className="rounded-full font-fredoka text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition">À venir</TabsTrigger>
            <TabsTrigger value="past" className="rounded-full font-fredoka text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition">Passés</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
            {events
                .filter((event) => isUpcoming(event) && event.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((event) => (
                  <EventGridCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
            {events
                .filter((event) => !isUpcoming(event) && event.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((event) => (
                  <EventGridCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
