"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { authApi } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/onboarding"
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await authApi.login({ email, password })
      document.cookie = `token=${result.token}; path=/; max-age=3600`
      toast({ title: "Connexion réussie", description: `Bienvenue ${result.user.full_name}`, variant: "default" })
      router.push(callbackUrl)
    } catch (error) {
      toast({ title: "Erreur de connexion", description: "Une erreur inattendue est survenue", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
      window.alert("Google login is not available yet")
  }

    const handleAppleLogin = () => {
      window.alert("Apple login is not available yet")
  }

  return (
    <div className="flex items-center justify-center p-4 h-full">
      <Card className="w-full max-w-md bg-card text-foreground">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-foreground">Connexion</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Entrez vos identifiants pour accéder à votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background text-base text-foreground w-full border border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-base font-semibold text-foreground">Mot de passe</Label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background text-base text-foreground w-full border border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground text-base font-semibold rounded-lg py-3" disabled={loading}>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
          <div className="mt-4 space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-5 w-5"/>
              Continuer avec Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAppleLogin}
            >
              <FaApple className="mr-2 h-5 w-5" />
              Continuer avec Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">
              Vous n'avez pas de compte?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 