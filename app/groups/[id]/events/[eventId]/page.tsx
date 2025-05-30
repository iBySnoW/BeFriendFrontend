"use client"
import Link from "next/link"
import { ChevronLeft, Settings, MessageSquare, Share2, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EventPage({
  params,
}: {
  params: { id: string; eventId: string }
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <Link href={`/groups/${params.id}`} className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Les cours à l'ECV</span>
          </Link>
          <Link href={`/groups/${params.id}/events/${params.eventId}/settings`}>
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="w-full h-48 bg-gray-100 rounded-lg" />

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Discussion
            </Button>
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Partager
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">15 février</p>
                <p className="text-sm text-gray-500">14:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">ECV Digital</p>
                <p className="text-sm text-gray-500">15 Rue Deshoulières, 44000 Nantes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">12 participants</p>
                <div className="flex -space-x-2 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h2 className="font-medium mb-2">À propos</h2>
            <p className="text-gray-600">Description détaillée de l'événement...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
