import { Loader2 } from "lucide-react"

export default function SubGroupDetailLoading() {
  return (
    <div className="wireframe-gradient min-h-screen flex items-center justify-center">
      <div className="wireframe-status-bar">
        <div className="text-sm text-white">12:35</div>
        <div className="flex items-center gap-1">
          <div className="text-sm text-white">4G</div>
          <div className="w-6 h-3 bg-white rounded-sm" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
        <p className="text-white text-lg font-medium">Chargement des détails...</p>
      </div>
    </div>
  )
}
