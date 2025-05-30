"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark" | "system"
type ColorScheme = "coral" | "blue" | "green" | "purple"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  defaultColorScheme?: ColorScheme
}

interface ThemeContextType {
  theme: Theme
  colorScheme: ColorScheme
  setTheme: (theme: Theme) => void
  setColorScheme: (colorScheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, defaultTheme = "light", defaultColorScheme = "coral" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme)

  useEffect(() => {
    const root = window.document.documentElement

    // Appliquer le thème
    root.classList.remove("light", "dark")
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Appliquer le schéma de couleurs
    root.setAttribute("data-color-scheme", colorScheme)
  }, [theme, colorScheme])

  const value = {
    theme,
    colorScheme,
    setTheme,
    setColorScheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
