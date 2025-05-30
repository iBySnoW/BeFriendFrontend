"use client"

import { useState } from "react"
import type { Expense, Participant } from "@/types/expense"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Car, Home, Ticket, Gift, MoreHorizontal, Receipt, Calendar } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ExpenseListProps {
  expenses: Expense[]
  participants: Participant[]
  onAddExpense?: () => void
}

export function ExpenseList({ expenses, participants, onAddExpense }: ExpenseListProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

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

  const getParticipantById = (id: string) => {
    return participants.find((p) => p.id === id) || { id, name: "Inconnu" }
  }

  return (
    <div className="space-y-4">
      {expenses.length === 0 ? (
        <div className="text-center py-8 wireframe-card">
          <Receipt className="h-12 w-12 text-white/40 mx-auto mb-3" />
          <p className="text-white/60">Aucune dépense enregistrée</p>
          {onAddExpense && (
            <Button onClick={onAddExpense} className="mt-4 wireframe-button">
              Ajouter une dépense
            </Button>
          )}
        </div>
      ) : (
        <>
          {expenses.map((expense) => (
            <Dialog key={expense.id}>
              <DialogTrigger asChild>
                <Card className="wireframe-card hover:bg-white/15 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                          {getCategoryIcon(expense.category)}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{expense.description}</h3>
                          <div className="flex items-center text-sm text-white/60">
                            <span>Payé par {getParticipantById(expense.paidBy).name}</span>
                            <span className="mx-2">•</span>
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatDate(expense.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{formatCurrency(expense.amount)}</p>
                        <p className="text-xs text-white/60">
                          {expense.paidFor.length} participant{expense.paidFor.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="wireframe-gradient border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Détails de la dépense</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div>
                        <h3 className="font-medium text-white text-lg">{expense.description}</h3>
                        <p className="text-white/60">{formatDate(expense.date)}</p>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white">
                      {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                    </Badge>
                  </div>

                  <div className="wireframe-card p-4">
                    <h4 className="font-medium text-white mb-2">Montant</h4>
                    <p className="text-2xl font-bold text-white">{formatCurrency(expense.amount)}</p>
                  </div>

                  <div className="wireframe-card p-4">
                    <h4 className="font-medium text-white mb-2">Payé par</h4>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={getParticipantById(expense.paidBy).avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-white/20 text-white">
                          {getParticipantById(expense.paidBy).name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white">{getParticipantById(expense.paidBy).name}</span>
                    </div>
                  </div>

                  <div className="wireframe-card p-4">
                    <h4 className="font-medium text-white mb-2">Concerné{expense.paidFor.length > 1 ? "s" : ""}</h4>
                    <div className="space-y-2">
                      {expense.paidFor.map((id) => (
                        <div key={id} className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={getParticipantById(id).avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-white/20 text-white">
                              {getParticipantById(id).name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-white">{getParticipantById(id).name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {expense.receipt && (
                    <div className="wireframe-card p-4">
                      <h4 className="font-medium text-white mb-2">Reçu</h4>
                      <div className="h-40 bg-white/10 rounded-lg overflow-hidden">
                        <img
                          src={expense.receipt || "/placeholder.svg"}
                          alt="Reçu"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </>
      )}
    </div>
  )
}
