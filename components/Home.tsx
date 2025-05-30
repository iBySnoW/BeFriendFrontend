"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Bienvenue sur BeFriend</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-secondary">Groupes actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/groups/1" className="text-primary hover:underline">
                  Groupe 1
                </Link>
              </li>
              <li>
                <Link href="/groups/2" className="text-primary hover:underline">
                  Groupe 2
                </Link>
              </li>
              <li>
                <Link href="/groups/3" className="text-primary hover:underline">
                  Groupe 3
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-secondary">Événements à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/events/1" className="text-primary hover:underline">
                  Événement 1
                </Link>
              </li>
              <li>
                <Link href="/events/2" className="text-primary hover:underline">
                  Événement 2
                </Link>
              </li>
              <li>
                <Link href="/events/3" className="text-primary hover:underline">
                  Événement 3
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Link href="/groups/new" passHref>
        <Button className="mt-6 bg-secondary text-white hover:bg-primary transition-colors">
          Créer un nouveau groupe
        </Button>
      </Link>
    </div>
  )
}
