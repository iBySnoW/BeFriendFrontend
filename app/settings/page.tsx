"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Bell, Moon, Calendar, Shield, HelpCircle, LogOut, Sun, Monitor } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div>
      {/* Header bar */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-5">
          <button
            onClick={() => router.back?.()}
            className="rounded-full bg-primary/10 hover:bg-primary/20 p-2 transition shadow"
            aria-label="Retour"
          >
            <ChevronLeft className="w-10 h-10 text-primary" />
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-fredoka flex-1">
            Paramètres
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md mx-auto px-4 py-8 space-y-8"
      >
        {/* Préférences */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground/80">Préférences</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition">
                <Label htmlFor="notifications" className="flex items-center gap-3 cursor-pointer">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Notifications</span>
                </Label>
                <Switch id="notifications" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition">
                <Label htmlFor="calendarSync" className="flex items-center gap-3 cursor-pointer">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Synchronisation calendrier</span>
                </Label>
                <Switch id="calendarSync" />
              </div>
            </div>
          </div>

          {/* Compte */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground/80">Compte</h2>
            <div className="space-y-2">
              <Link href="/settings/privacy" className="flex items-center justify-between p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition group">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Confidentialité</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary rotate-180 transition" />
              </Link>

              <Link href="/settings/help" className="flex items-center justify-between p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition group">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Aide et support</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary rotate-180 transition" />
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 space-y-4">
            <p className="text-sm text-center text-muted-foreground">Version 1.0.0</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
