"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export function OnboardingScreen1() {
  return (
    <div className="text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      <h1 className="text-2xl font-bold text-foreground-900 mb-2">Simplifiez l'organisation de vos sorties entre amis !</h1>
      <p className="text-base text-textSecondary">
        Planifiez vos événements, gérez vos disponibilités et partagez vos budgets en toute simplicité.
      </p>
    </div>
  )
}
