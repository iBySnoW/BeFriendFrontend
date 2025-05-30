import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight font-heading text-foreground-900", className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("scroll-m-20 text-3xl font-semibold tracking-tight font-heading text-foreground-800", className)}>
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight font-heading text-foreground-800", className)}>
      {children}
    </h3>
  )
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight font-heading text-foreground-700", className)}>
      {children}
    </h4>
  )
}

export function P({ children, className }: TypographyProps) {
  return <p className={cn("leading-7 text-foreground-700", className)}>{children}</p>
}

export function Small({ children, className }: TypographyProps) {
  return <small className={cn("text-sm font-medium leading-none text-foreground-500", className)}>{children}</small>
}

export function Subtle({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-foreground-500", className)}>{children}</p>
}
