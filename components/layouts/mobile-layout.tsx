import type { ReactNode } from "react"
import { SafeAreaContainer } from "../ui/safe-area-container"

interface MobileLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  fullHeight?: boolean
}

export function MobileLayout({ children, header, footer, fullHeight = true }: MobileLayoutProps) {
  return (
    <SafeAreaContainer className="mobile-container">
      <div className="flex flex-col min-h-screen">
        {header && <header className="top-nav">{header}</header>}
        <main className={`flex-1 ${fullHeight ? "min-h-0" : ""}`}>{children}</main>
        {footer && <footer className="bottom-nav">{footer}</footer>}
      </div>
    </SafeAreaContainer>
  )
}
