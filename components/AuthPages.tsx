"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AuthPages() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Mot de passe" type="password" />
            <Button className="w-full">Se connecter</Button>
          </form>
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full">
              Connexion avec Google
            </Button>
            <Button variant="outline" className="w-full">
              Connexion avec Apple
            </Button>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-primary">
              Mot de passe oublié ?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
