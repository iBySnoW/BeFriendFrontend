import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
      <div className="flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
        <p className="text-white text-lg font-medium">Chargement...</p>
      </div>
  )
}
