"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, ChevronRight, Calendar, User, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { groupApi } from "@/lib/api/group"
import { eventApi } from "@/lib/api/event"
import { authApi } from "@/lib/api/auth"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Group } from "@/types/group"
import { Event } from "@/types/event"

export default function HomePage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authApi.getCurrentUser()
        setUser(user.user)
        const userGroups = await groupApi.getGroupsByUserId(user.user.id) as Group[]
        setGroups(userGroups)
        const userEvents = await eventApi.getEventsByUserId(user.user.id) as Event[]
        setEvents(userEvents)

      } catch (err) {
        setGroups([])
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Fonction utilitaire pour savoir si un événement est à venir
  function isUpcoming(event: { start_date: string | Date }) {
    // Si event.start_date est un objet Date, on le convertit en string ISO
    const dateStr = typeof event.start_date === 'string' ? event.start_date : event.start_date.toISOString()
    const eventDate = new Date(dateStr)
    const now = new Date()
    eventDate.setHours(0,0,0,0)
    now.setHours(0,0,0,0)
    return eventDate >= now
  }

  return (
    <div className="relative">
      <div className=" flex flex-col gap-4 pl-4 pt-4">
        <h1 className="text-4xl font-bold text-foreground">BeFriend</h1>
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto px-4 py-8 space-y-10"
      >
        {/* Barre de recherche moderne */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Rechercher un groupe, un événement..."
            className="pl-12 bg-card border border-border text-base rounded-full shadow-md focus:ring-2 focus:ring-primary/30 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Section Groupes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">Mes Groupes</h2>
            <Link href="/groups" className="text-sm text-primary flex items-center font-medium rounded-full px-3 py-1 hover:bg-primary/10 transition">
              Voir tout
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="mb-4 flex justify-end">
            <Link href="/groups/new">
              <Button className="bg-primary text-primary-foreground rounded-full flex items-center gap-2 px-5 py-2 shadow-md hover:scale-105 transition">
                <UserPlus className="w-5 h-5" />
                <span>Créer un groupe</span>
              </Button>
            </Link>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {groups.map((group, idx) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="block"
                >
                  <Link href={`/groups/${group.id}`}>
                    <div className="w-36 bg-card rounded-2xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 border-2 border-primary/20 shadow">
                        {group.avatar_url ? (
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={group.avatar_url} alt={group.name} />
                            <AvatarFallback>{group.name?.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <User className="w-8 h-8 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium text-center text-foreground line-clamp-2">{group.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{group.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Section Événements */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">Événements à venir</h2>
            <Link href="/events" className="text-sm text-primary flex items-center font-medium rounded-full px-3 py-1 hover:bg-primary/10 transition">
              Voir tout
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {events.filter(isUpcoming).map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/events/${event.id}`} className="block">
                  <div className="bg-card rounded-2xl shadow-lg p-4 flex items-center hover:scale-[1.02] transition">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mr-4 border-2 shadow",
                    )}>
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h3 className="font-medium text-foreground line-clamp-1">{event.title}</h3>
                        {event.start_date && new Date(event.start_date) < new Date() && (
                          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full shadow font-semibold animate-pulse">
                            Aujourd'hui
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                      {new Date(event.start_date).toLocaleDateString()} • {event.end_date ? new Date(event.end_date).toLocaleDateString() : ""}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}
