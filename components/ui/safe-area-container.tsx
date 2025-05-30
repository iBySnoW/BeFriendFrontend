import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SafeAreaContainerProps {
  children: ReactNode
  className?: string
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
}

export function SafeAreaContainer({
  children,
  className,
  top = true,
  bottom = true,
  left = true,
  right = true,
}: SafeAreaContainerProps) {
  return (
    <div
      className={cn(
        "w-full h-full overflow-auto",
        top && "safe-top",
        bottom && "safe-bottom",
        left && "safe-left",
        right && "safe-right",
        className
      )}
    >
      {children}
    </div>
  )
}
