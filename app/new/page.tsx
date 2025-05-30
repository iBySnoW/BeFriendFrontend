"use client"
import { X, Image, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewEventPage() {
  return (
    <div className="mobile-container ios-gradient">
      <div className="ios-status-bar">
        <div className="text-sm text-white">12:35</div>
        <div className="flex items-center gap-1">
          <div className="text-sm text-white">4G</div>
          <div className="w-6 h-3 bg-white rounded-sm" />
        </div>
      </div>

      <div className="flex justify-between items-center p-4">
        <Link href="/" className="ios-button !p-2">
          <X className="w-5 h-5" />
        </Link>
        <Button className="ios-button">Aperçu</Button>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex flex-col items-center justify-center py-8 ios-card">
          <Image className="w-12 h-12 text-white/60 mb-2" />
          <button className="text-white/80">Ajouter un arrière-plan</button>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Titre de l'événement"
            className="text-2xl font-semibold bg-transparent border-none text-white placeholder-white/60 focus:ring-0"
          />

          <button className="flex items-center gap-2 p-4 w-full ios-card">
            <Calendar className="w-5 h-5 text-white/60" />
            <span className="text-white/80">Date et heure</span>
          </button>

          <button className="flex items-center gap-2 p-4 w-full ios-card">
            <MapPin className="w-5 h-5 text-white/60" />
            <span className="text-white/80">Lieu</span>
          </button>
        </div>

        <div className="ios-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">CD</div>
            <div>
              <p className="font-medium text-white">Organisé par Corentin DANVIN</p>
              <p className="text-white/60 text-sm">Ajoutez une description.</p>
            </div>
          </div>
        </div>

        <div className="ios-card p-4">
          <div className="flex items-center gap-3 mb-4">
            <Image className="w-6 h-6 text-white/60" />
            <div>
              <p className="font-medium text-white">Album partagé</p>
              <p className="text-white/60 text-sm">
                Créez un album photo pour cet événement et partagez-le avec les participants.
              </p>
            </div>
          </div>
          <Button className="w-full ios-button">Créer un album</Button>
        </div>
      </div>
    </div>
  )
}
