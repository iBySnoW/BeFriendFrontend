"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventManagement() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Gestion des Événements</h1>
      <Card className="bg-white shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-secondary">Créer un nouvel événement</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Select>
              <SelectTrigger className="border-secondary">
                <SelectValue placeholder="Type d'événement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voyage">Voyage</SelectItem>
                <SelectItem value="anniversaire">Anniversaire</SelectItem>
                <SelectItem value="sortie">Sortie quotidienne</SelectItem>
                <SelectItem value="personnalise">Personnalisé</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Nom de l'événement" className="border-secondary" />
            <Input placeholder="Date" type="date" className="border-secondary" />
            <Input placeholder="Lieu" className="border-secondary" />
            <Button className="bg-secondary text-white hover:bg-primary transition-colors">Créer l'événement</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-secondary">Mes événements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <Link href="/event/1" className="text-primary hover:underline">
                Événement 1 - Gérer
              </Link>
            </li>
            <li>
              <Link href="/event/2" className="text-primary hover:underline">
                Événement 2 - Gérer
              </Link>
            </li>
            <li>
              <Link href="/event/3" className="text-primary hover:underline">
                Événement 3 - Gérer
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
