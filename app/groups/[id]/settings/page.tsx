"use client"
import Link from "next/link"
import { X, ChevronRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GroupSettingsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <Link href={`/groups/${params.id}`} className="rounded-full p-2 hover:bg-gray-100">
            <X className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold">Paramètres du groupe</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-500 px-2">Général</h2>

          <div className="space-y-2">
            <Link
              href={`/groups/${params.id}/settings/edit`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <span>Modifier le groupe</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href={`/groups/${params.id}/settings/theme`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <span>Personnalisation du thème</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-500 px-2">Notifications</h2>

          <div className="space-y-2">
            <Link
              href={`/groups/${params.id}/settings/notifications`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <span>Paramètres des notifications</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="pt-6">
          <Button variant="destructive" className="w-full flex items-center gap-2 justify-center">
            <Trash2 className="w-4 h-4" />
            Supprimer le groupe
          </Button>
        </div>
      </div>
    </div>
  )
}
