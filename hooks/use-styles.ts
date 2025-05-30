"use client"

import { themeConfig } from "@/lib/theme-config"
import { useCallback } from "react"

export function useStyles() {
  // Fonction pour obtenir des styles de carte cohérents
  const getCardStyles = useCallback((variant: "default" | "elevated" | "outlined" = "default") => {
    const baseStyles = "rounded-lg p-4"

    switch (variant) {
      case "elevated":
        return `${baseStyles} bg-white shadow-md`
      case "outlined":
        return `${baseStyles} bg-white border border-neutral-200`
      default:
        return `${baseStyles} bg-white`
    }
  }, [])

  // Fonction pour obtenir des styles de bouton cohérents
  const getButtonStyles = useCallback(
    (variant: "primary" | "secondary" | "outline" | "ghost" = "primary", size: "sm" | "md" | "lg" = "md") => {
      const baseStyles =
        "font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

      // Tailles
      const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
      }

      // Variantes
      const variantStyles = {
        primary: `bg-primary hover:bg-primary-dark text-white focus:ring-primary/50`,
        secondary: `bg-secondary hover:bg-secondary-dark text-white focus:ring-secondary/50`,
        outline: `border border-neutral-300 bg-transparent hover:bg-neutral-50 text-foreground-800 focus:ring-neutral-200`,
        ghost: `bg-transparent hover:bg-neutral-100 text-foreground-800 focus:ring-neutral-200`,
      }

      return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`
    },
    [],
  )

  // Fonction pour obtenir des styles d'entrée cohérents
  const getInputStyles = useCallback((hasError = false) => {
    const baseStyles =
      "block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50"

    return hasError ? `${baseStyles} border-red-300 focus:border-red-500 focus:ring-red-500/20` : baseStyles
  }, [])

  return {
    getCardStyles,
    getButtonStyles,
    getInputStyles,
    spacing: themeConfig.spacing,
    colors: themeConfig.colors,
    typography: themeConfig.typography,
    borders: themeConfig.borders,
    shadows: themeConfig.shadows,
  }
}
