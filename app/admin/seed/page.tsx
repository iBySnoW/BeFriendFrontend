"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { seedDatabase } from "@/scripts/seed-database"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function SeedDatabasePage() {
  // Utiliser null comme valeur initiale
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  // Désactiver le prérendu statique pour cette page
  // Cette ligne indique à Next.js de toujours rendre cette page côté client
  // et de ne pas essayer de la prérender côté serveur

  const handleSeed = async () => {
    try {
      setLoading(true)
      const result = await seedDatabase()
      setResult(result)
    } catch (error) {
      console.error("Erreur:", error)
      setResult({ success: false, message: "Une erreur inattendue est survenue" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Peupler la base de données</CardTitle>
          <CardDescription>
            Cette action va peupler la base de données avec des données de test. Utilisez cette fonctionnalité
            uniquement dans un environnement de développement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result && (
            <div
              className={`p-4 mb-4 rounded-md ${
                result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              <div className="flex items-center">
                {result.success ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
                <p>{result.message}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSeed} disabled={loading} className="w-full befriend-button-primary">
            {loading ? "Peuplement en cours..." : "Peupler la base de données"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
