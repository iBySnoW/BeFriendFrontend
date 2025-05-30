import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface EventCardProps {
  event: {
    id: number
    name: string
    date: string
    group: string
    color: string
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} aria-label={`Voir l'événement ${event.name}`}>
      <Card className="rounded-xl shadow bg-card hover:scale-[1.015] hover:shadow-lg transition-transform duration-200 border border-border focus-within:ring-2 focus-within:ring-primary p-0">
        <div className="flex items-center gap-3 p-3 min-h-[56px]">
          <div className={`w-10 h-10 rounded-lg ${event.color} flex items-center justify-center shadow-sm`}>
            <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-grow">
            <h3 className="font-fredoka font-bold text-base text-foreground leading-tight">{event.name}</h3>
            <p className="text-xs text-muted-foreground font-poppins leading-tight">{event.date} • {event.group}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground ml-1" />
        </div>
      </Card>
    </Link>
  )
}
