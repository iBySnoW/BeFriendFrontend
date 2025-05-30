import Link from "next/link"
import { Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

interface EventGridCardProps {
  event: {
    id: number
    name: string
    start_date: string
    end_date?: string
    group: string
    color: string
  }
}

export function EventGridCard({ event }: EventGridCardProps) {
  return (
    <Link href={`/events/${event.id}`} aria-label={`Voir l'événement ${event.name}`}>
      <Card className="rounded-xl shadow-md bg-card hover:scale-105 transition">
        <div className="flex flex-col items-center p-4">
          <div className={`w-14 h-14 rounded-full ${event.color} flex items-center justify-center mb-3 shadow-sm`}>
            <Calendar className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-fredoka font-bold text-center text-base text-foreground leading-tight">{event.name}</h3>
          <p className="text-xs text-muted-foreground font-poppins mt-1">
            {new Date(event.start_date).toLocaleDateString()} {event.end_date ? `- ${new Date(event.end_date).toLocaleDateString()}` : ''} • {event.group}
          </p>
        </div>
      </Card>
    </Link>
  )
} 