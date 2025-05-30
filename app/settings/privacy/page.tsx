"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Eye, Lock, Share2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PrivacySettingsPage() {
  return (
    <div>
      {/* Header sticky moderne */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-5">
          <Link href="/settings" className="rounded-full bg-primary/10 hover:bg-primary/20 p-2 transition shadow" aria-label="Retour">
            <ChevronLeft className="w-6 h-6 text-primary" />
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-fredoka flex-1">Confidentialité</h1>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-md mx-auto px-4 py-8 space-y-8">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground/80">Visibilité du profil</h2>
            <div className="space-y-2">
            <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-sm 
             hover:shadow-md transition">
                <Label htmlFor="profile-visibility" className="flex items-center gap-3 cursor-pointer">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-foreground">Profil public</span>
                </Label>
              <Switch id="profile-visibility" />
              </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition">
                <Label htmlFor="location-sharing" className="flex items-center gap-3 cursor-pointer">
                <Share2 className="w-5 h-5 text-primary" />
                <span className="text-foreground">Partage de localisation</span>
                </Label>
              <Switch id="location-sharing" />
              </div>
            </div>
          </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground/80">Sécurité</h2>
            <div className="space-y-2">
            <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition">
                <Label htmlFor="two-factor" className="flex items-center gap-3 cursor-pointer">
                <Lock className="w-5 h-5 text-primary" />
                <span className="text-foreground">Authentification à deux facteurs</span>
                </Label>
              <Switch id="two-factor" />
              </div>
            </div>
          </div>

        <div className="p-4 rounded-xl bg-card/80 shadow border border-border">
          <p className="text-muted-foreground text-sm">
            Vos données sont protégées conformément à notre politique de confidentialité. Vous pouvez demander la suppression de vos données à tout moment.
            </p>
          </div>
        </motion.div>
    </div>
  )
}
