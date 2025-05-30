"use client"

import type { ExpenseSummary as ExpenseSummaryType } from "@/types/expense"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Car, Home, Ticket, Gift, MoreHorizontal } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType
}

export function ExpenseSummary({ summary }: ExpenseSummaryProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <ShoppingCart className="h-5 w-5" />
      case "transport":
        return <Car className="h-5 w-5" />
      case "accommodation":
        return <Home className="h-5 w-5" />
      case "activity":
        return <Ticket className="h-5 w-5" />
      case "gift":
        return <Gift className="h-5 w-5" />
      default:
        return <MoreHorizontal className="h-5 w-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "food":
        return "Nourriture"
      case "transport":
        return "Transport"
      case "accommodation":
        return "Logement"
      case "activity":
        return "Activité"
      case "gift":
        return "Cadeau"
      default:
        return "Autre"
    }
  }

  // Calculer le pourcentage pour chaque catégorie
  const calculatePercentage = (amount: number) => {
    return summary.totalAmount > 0 ? (amount / summary.totalAmount) * 100 : 0
  }

  // Trier les catégories par montant décroissant
  const sortedCategories = Object.entries(summary.expensesByCategory).sort(([, a], [, b]) => b - a)

  return (
    <div className="space-y-4">
      <Card className="wireframe-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Total des dépenses</h3>
            <p className="text-2xl font-bold text-white">{formatCurrency(summary.totalAmount)}</p>
          </div>
        </CardContent>
      </Card>

      {summary.totalAmount > 0 && (
        <Card className="wireframe-card">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-white mb-4">Répartition par catégorie</h3>
            <div className="space-y-3">
              {sortedCategories.map(([category, amount]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                        {getCategoryIcon(category)}
                      </div>
                      <span className="text-white">{getCategoryName(category)}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{formatCurrency(amount)}</p>
                      <p className="text-xs text-white/60">{calculatePercentage(amount).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white" style={{ width: `${calculatePercentage(amount)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
