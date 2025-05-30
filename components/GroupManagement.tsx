"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function GroupManagement() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Gestion des Groupes</h1>
      <Card className="bg-white shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-secondary">Créer un nouveau groupe</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Nom du groupe" className="border-secondary" />
            <Input placeholder="Description" className="border-secondary" />
            <Button className="bg-secondary text-white hover:bg-primary transition-colors">Créer le groupe</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-secondary">Mes groupes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <Link href="/groups/1" className="text-primary hover:underline">
                Groupe 1 - Gérer
              </Link>
            </li>
            <li>
              <Link href="/groups/2" className="text-primary hover:underline">
                Groupe 2 - Gérer
              </Link>
            </li>
            <li>
              <Link href="/groups/3" className="text-primary hover:underline">
                Groupe 3 - Gérer
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
