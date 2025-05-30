"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { OnboardingScreen1 } from "@/components/onboarding/OnboardingScreen1"
import { OnboardingScreen2 } from "@/components/onboarding/OnboardingScreen2"
import { OnboardingScreen3 } from "@/components/onboarding/OnboardingScreen3"
import { OnboardingScreen4 } from "@/components/onboarding/OnboardingScreen4"

const screens = [OnboardingScreen1, OnboardingScreen2, OnboardingScreen3, OnboardingScreen4]

export default function OnboardingPage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const CurrentScreenComponent = screens[currentScreen]

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center mx-4">
        <motion.div
          className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-lg p-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          key={currentScreen}
        >
          <div className="flex items-center justify-center">
          <CurrentScreenComponent />
          </div>
        </motion.div>
      </div>

      <div className="p-4 flex justify-between items-center">
        {currentScreen > 0 ? (
          <Button onClick={prevScreen} variant="ghost" className="text-primary text-base font-medium px-4 py-2">
            <ChevronLeft className="mr-2 h-5 w-5" /> Précédent
          </Button>
        ) : (
          <div></div>
        )}
        <div className="flex space-x-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${index === currentScreen ? "bg-primary" : "bg-neutral-100"}`}
            ></div>
          ))}
        </div>
        {currentScreen < screens.length - 1 ? (
          <Button onClick={nextScreen} className="bg-primary text-primary-foreground text-base font-semibold px-6 py-2 rounded-lg shadow-md">
            Suivant <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Link href="/">
            <Button className="bg-primary text-primary-foreground text-base font-semibold px-6 py-2 rounded-lg shadow-md">
              Terminer
            </Button>
          </Link>
        )}
      </div>

      <div className="p-4 text-center">
        <Link href="/">
          <Button variant="link" className="text-textSecondary text-sm underline underline-offset-2">
            Passer l'onboarding
          </Button>
        </Link>
      </div>
    </div>
  )
}
