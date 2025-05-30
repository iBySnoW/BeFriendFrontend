"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function BudgetManagement() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Gestion du Budget</h1>
      <Card className="bg-white shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-secondary">Ajouter une dépense</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Montant" type="number" className="border-secondary" />
            <Input placeholder="Description" className="border-secondary" />
            <Button className="bg-secondary text-white hover:bg-primary transition-colors">Ajouter la dépense</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-secondary">Historique des dépenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Dépense 1 - 50€</li>
            <li>Dépense 2 - 30€</li>
            <li>Dépense 3 - 20€</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-secondary">Répartition des dépenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Utilisateur 1 doit 25€</li>
            <li>Utilisateur 2 doit 15€</li>
            <li>Utilisateur 3 est à jour</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
