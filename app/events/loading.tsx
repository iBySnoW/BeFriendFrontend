import { Loader2 } from "lucide-react"

export default function EventsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
        <p className="text-white text-lg font-medium">Chargement des événements...</p>
      </div>
    </div>
  )
}
