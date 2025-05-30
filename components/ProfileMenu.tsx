"use client"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut, ChevronRight } from "lucide-react"
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function ProfileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <User className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l border-border">
        <div className="h-full flex flex-col bg-background">
          <SheetHeader className="p-6 border-b border-border text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl font-fredoka">Corentin DANVIN</SheetTitle>
                <p className="text-sm text-muted-foreground">corentin@example.com</p>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto py-6">
            <nav className="space-y-2 px-6">
              <Link href="/profile" className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span>Mon profil</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
              <Link href="/settings" className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Paramètres</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            </nav>
          </div>

          <div className="p-6 border-t border-border">
            <Link href="/auth" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Se déconnecter
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
