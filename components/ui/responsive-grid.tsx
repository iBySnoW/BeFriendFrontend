import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "none" | "xs" | "sm" | "md" | "lg"
}

export function ResponsiveGrid({
  children,
  className,
  columns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
  },
  gap = "md",
}: ResponsiveGridProps) {
  const gapClasses = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }

  const getColumnsClass = () => {
    const classes = []

    if (columns.xs) {
      classes.push(`grid-cols-${columns.xs}`)
    }

    if (columns.sm) {
      classes.push(`sm:grid-cols-${columns.sm}`)
    }

    if (columns.md) {
      classes.push(`md:grid-cols-${columns.md}`)
    }

    if (columns.lg) {
      classes.push(`lg:grid-cols-${columns.lg}`)
    }

    if (columns.xl) {
      classes.push(`xl:grid-cols-${columns.xl}`)
    }

    return classes.join(" ")
  }

  return <div className={cn("grid", getColumnsClass(), gapClasses[gap], className)}>{children}</div>
}
