"use client"

import type { Balance, Participant } from "@/types/expense"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface BalanceSummaryProps {
  balances: Balance[]
  participants: Participant[]
}

export function BalanceSummary({ balances, participants }: BalanceSummaryProps) {
  const getParticipantById = (id: string) => {
    return participants.find((p) => p.id === id) || { id, name: "Inconnu" }
  }

  // Trier les balances: d'abord ceux qui doivent recevoir, puis ceux qui doivent payer
  const sortedBalances = [...balances].sort((a, b) => b.amount - a.amount)

  // Calculer les remboursements optimaux
  const calculateOptimalPayments = () => {
    const payments: { from: string; to: string; amount: number }[] = []

    // Créer des copies des balances pour les manipuler
    const creditors = sortedBalances.filter((b) => b.amount > 0).map((b) => ({ ...b }))
    const debtors = sortedBalances.filter((b) => b.amount < 0).map((b) => ({ ...b, amount: Math.abs(b.amount) }))

    // Tant qu'il reste des dettes à régler
    while (creditors.length > 0 && debtors.length > 0) {
      // Prendre le plus grand créditeur et le plus grand débiteur
      const creditor = creditors[0]
      const debtor = debtors[0]

      // Déterminer le montant du remboursement
      const amount = Math.min(creditor.amount, debtor.amount)

      // Ajouter le remboursement à la liste
      payments.push({
        from: debtor.participantId,
        to: creditor.participantId,
        amount: Number.parseFloat(amount.toFixed(2)),
      })

      // Mettre à jour les soldes
      creditor.amount -= amount
      debtor.amount -= amount

      // Retirer les personnes qui ont soldé leurs comptes
      if (creditor.amount < 0.01) creditors.shift()
      if (debtor.amount < 0.01) debtors.shift()
    }

    return payments
  }

  const optimalPayments = calculateOptimalPayments()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Récapitulatif des soldes</h3>

      {balances.length === 0 ? (
        <div className="text-center py-8 wireframe-card">
          <p className="text-white/60">Aucune dépense enregistrée</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3">
            {sortedBalances.map((balance) => {
              const participant = getParticipantById(balance.participantId)
              const isPositive = balance.amount > 0

              return (
                <Card key={balance.participantId} className="wireframe-card">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-white/20 text-white">{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{participant.name}</p>
                        <div className="flex items-center text-sm">
                          {isPositive ? (
                            <span className="text-green-400 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Doit recevoir
                            </span>
                          ) : (
                            <span className="text-red-400 flex items-center">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Doit payer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
                      {isPositive ? "+" : "-"}
                      {formatCurrency(Math.abs(balance.amount))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {optimalPayments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-3">Remboursements suggérés</h3>
              <div className="space-y-3">
                {optimalPayments.map((payment, index) => {
                  const from = getParticipantById(payment.from)
                  const to = getParticipantById(payment.to)

                  return (
                    <Card key={index} className="wireframe-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={from.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-white/20 text-white">{from.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <ArrowRight className="mx-2 text-white/60" />
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={to.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-white/20 text-white">{to.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-white">{formatCurrency(payment.amount)}</p>
                            <p className="text-xs text-white/60">
                              {from.name} doit payer {to.name}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
