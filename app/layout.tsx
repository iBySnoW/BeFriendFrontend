import { Metadata } from "next"
import { Inter, Poppins } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { StyleProvider } from "@/components/style-provider"
import { AppShell } from "@/components/ui/AppShell"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "BeFriend",
  description: "BeFriend is a mobile application for friends",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10`}>
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
          <StyleProvider>
            <AppShell>
              {children}
            </AppShell>
          </StyleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
