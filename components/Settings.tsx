"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function Settings() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Paramètres</h1>
      <Card className="bg-white shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-secondary">Préférences de l'application</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Mode sombre</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications push</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Synchronisation Google Calendar</span>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-secondary">Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="bg-secondary text-white hover:bg-primary transition-colors">Modifier le profil</Button>
          <Button
            variant="outline"
            className="mt-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            Changer le mot de passe
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
