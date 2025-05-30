"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "@/models/user"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const user = await createUser(formData)
      setResult({ success: true, message: `Utilisateur créé avec succès: ${user.username}` })
      setFormData({ username: "", email: "", password: "", full_name: "" })
    } catch (error) {
      console.error("Erreur:", error)
      setResult({ success: false, message: "Une erreur est survenue lors de la création de l'utilisateur" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Créer un utilisateur</CardTitle>
          <CardDescription>
            Créez un nouvel utilisateur dans la base de données. Utilisez cette fonctionnalité uniquement dans un environnement de développement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name">Nom complet</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
            </div>
            {result && (
              <div
                className={`p-4 rounded-md ${
                  result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                <div className="flex items-center">
                  {result.success ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
                  <p>{result.message}</p>
                </div>
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full befriend-button-primary">
              {loading ? "Création en cours..." : "Créer l'utilisateur"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 