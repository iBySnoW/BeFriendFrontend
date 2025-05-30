"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export function OnboardingScreen2() {
  return (
    <div className="text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Calendar className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      <h1 className="text-2xl font-bold text-foreground-900 mb-2">Organisez et suivez vos événements</h1>
      <p className="text-base text-textSecondary">
        Créez des groupes, proposez des dates et recevez des rappels pour ne rien manquer.
      </p>
    </div>
  )
}
