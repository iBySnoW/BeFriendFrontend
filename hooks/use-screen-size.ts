"use client"

import { useState, useEffect } from "react"

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl"

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>("md")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 640) {
        setScreenSize("xs")
      } else if (width >= 640 && width < 768) {
        setScreenSize("sm")
      } else if (width >= 768 && width < 1024) {
        setScreenSize("md")
      } else if (width >= 1024 && width < 1280) {
        setScreenSize("lg")
      } else {
        setScreenSize("xl")
      }
    }

    // Initialiser
    handleResize()

    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", handleResize)

    // Nettoyer
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = screenSize === "xs" || screenSize === "sm"
  const isTablet = screenSize === "md"
  const isDesktop = screenSize === "lg" || screenSize === "xl"

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
  }
}
