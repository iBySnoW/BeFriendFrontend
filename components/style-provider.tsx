"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"

interface StyleProviderProps {
  children: React.ReactNode
}

export function StyleProvider({ children }: StyleProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>
}
