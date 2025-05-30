"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api/auth"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, LogOut, ChevronLeft, Sun, Moon, Monitor, Pencil } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const THEME_COOKIE = "theme"
const themeOptions = [
  { value: "system", label: "Système", icon: Monitor },
  { value: "light", label: "Clair", icon: Sun },
  { value: "dark", label: "Sombre", icon: Moon },
]

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<string>("system")

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true)
        const currentUser = await authApi.getCurrentUser()
        const userDetails = await authApi.getUserById(currentUser.user.id)
        setUser(userDetails)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du profil",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    loadUserData()
  }, [router, toast])

  useEffect(() => {
    const cookieTheme = Cookies.get(THEME_COOKIE)
    if (cookieTheme) {
      setTheme(cookieTheme)
      applyTheme(cookieTheme)
    } else {
      setTheme("system")
      applyTheme("system")
    }
  }, [])

  function applyTheme(theme: string) {
    const html = document.documentElement
    if (theme === "dark") {
      html.classList.add("dark")
    } else if (theme === "light") {
      html.classList.remove("dark")
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.classList.add("dark")
      } else {
        html.classList.remove("dark")
      }
    }
  }

  const handleThemeChange = (value: string) => {
    setTheme(value)
    Cookies.set(THEME_COOKIE, value, { expires: 365 })
    applyTheme(value)
  }

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
      router.push("/auth/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement du profil...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Utilisateur non trouvé</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header sticky moderne */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-5">
          <button
            onClick={() => router.back?.()}
            className="rounded-full bg-primary/10 hover:bg-primary/20 p-2 transition shadow"
            aria-label="Retour"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-fredoka flex-1">
            Mon profil
          </h1>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-6 w-6 text-primary" />
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md mx-auto px-4 py-8"
      >
        <Card className="overflow-visible border-none bg-card/80 backdrop-blur-xl">
          <CardContent className="flex flex-col items-center pt-8 pb-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <Avatar className="h-28 w-28 border-4 border-primary/30 shadow-lg">
                <AvatarImage src={user.avatar_url || "/placeholder.svg?height=96&width=96"} alt={user.full_name} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {user.full_name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full border-2 border-background shadow"
                aria-label="Éditer le profil"
              >
                <Pencil className="h-4 w-4 text-primary" />
              </Button>
            </motion.div>
            <h2 className="text-xl font-bold mt-4 text-foreground">{user.full_name}</h2>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </CardContent>
          <CardContent className="pt-0">
            {/* Sélecteur de thème moderne */}
            <div className="mt-6">
              <label className="block text-base font-semibold mb-2 text-foreground">Thème de l'application</label>
              <div className="flex gap-3 justify-center">
                {themeOptions.map(opt => {
                  const Icon = opt.icon
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full border transition shadow-sm font-medium",
                        theme === opt.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border hover:bg-accent"
                      )}
                      onClick={() => handleThemeChange(opt.value)}
                      aria-pressed={theme === opt.value}
                    >
                      <Icon className="w-5 h-5" />
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-4">
            <Button
              variant="outline"
              className="w-full rounded-full py-3 font-semibold flex items-center justify-center gap-2 transition"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
