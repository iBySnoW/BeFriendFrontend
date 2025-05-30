"use client"

import { motion } from "framer-motion"
import { PiggyBank } from "lucide-react"

export function OnboardingScreen3() {
  return (
    <div className="text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <PiggyBank className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Gérez vos cagnottes en toute transparence
        </h1>
      <p className="text-base text-textSecondary">
        Suivez qui a payé quoi, visualisez les montants restants et simplifiez les remboursements.
      </p>
    </div>
  )
}
