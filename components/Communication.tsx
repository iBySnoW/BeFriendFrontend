"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Communication() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Communication</h1>
      <Card className="bg-white shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-secondary">Discussion de groupe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-background mb-4 p-2 rounded">
            {/* Zone de chat */}
            Messages ici...
          </div>
          <div className="flex">
            <Input placeholder="Votre message" className="flex-grow border-secondary" />
            <Button className="ml-2 bg-secondary text-white hover:bg-primary transition-colors">Envoyer</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-secondary">Sondages</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="bg-secondary text-white hover:bg-primary transition-colors">
            Créer un nouveau sondage
          </Button>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-primary hover:underline">
                Sondage 1 - Voter
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Sondage 2 - Voter
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Sondage 3 - Voter
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
