"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AppCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined"
  onClick?: () => void
}

export function AppCard({ children, className, variant = "default", onClick }: AppCardProps) {
  const baseStyles = "rounded-lg p-4"

  const variantStyles = {
    default: "bg-white",
    elevated: "bg-white shadow-md",
    outlined: "bg-white border border-neutral-200",
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} onClick={onClick}>
      {children}
    </div>
  )
}
