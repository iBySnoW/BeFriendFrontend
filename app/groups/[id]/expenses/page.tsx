"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Receipt, ArrowLeftRight, PieChart, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { expenseApi } from "@/lib/api/expense"
import { Balance, Expense } from "@/types/expense"
import { Group, GroupMember } from "@/types/group"
import { groupApi } from "@/lib/api/group"

export default function GroupExpensesPage() {
  const params = useParams()
  const { toast } = useToast()
  const groupId = Number.parseInt(params.id as string)

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [balances, setBalances] = useState<Balance[]>([])
  const [members, setMembers] = useState<GroupMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    description: "",
  })
  const [participantsShares, setParticipantsShares] = useState<Record<number, number>>({})

  // --- MOCK EXPENSES ---
  const mockExpenses: Expense[] = [
    {
      id: "1",
      description: "Soirée pizza entre amis 🍕",
      amount: 60,
      paidBy: "1",
      paidFor: ["1", "2", "3"],
      date: new Date("2024-02-10"),
      category: "food",
    },
    {
      id: "2",
      description: "Cadeau pour Alice 🎁",
      amount: 45,
      paidBy: "2",
      paidFor: ["1", "2", "3"],
      date: new Date("2024-02-12"),
      category: "gift",
    },
    {
      id: "3",
      description: "Chips, boissons, etc.",
      amount: 30,
      paidBy: "3",
      paidFor: ["2", "3"],
      date: new Date("2024-02-14"),
      category: "food",
    },
  ]
  // --- FIN MOCK EXPENSES ---

  useEffect(() => {
    setExpenses(mockExpenses)
    setLoading(false)
  }, [groupId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewExpense((prev) => ({ ...prev, [name]: value }))
  }

  const handleShareChange = (userId: number, value: string) => {
    const amount = Number.parseFloat(value) || 0
    setParticipantsShares((prev) => ({ ...prev, [userId]: amount }))
  }

  const distributeEvenly = () => {
    const amount = Number.parseFloat(newExpense.amount)
    if (isNaN(amount) || amount <= 0) return

    const memberCount = members.length
    const sharePerMember = amount / memberCount

    const newShares: Record<number, number> = {}
    members.forEach((member: any) => {
      newShares[member.id] = Number.parseFloat(sharePerMember.toFixed(2))
    })

    setParticipantsShares(newShares)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const amount = Number.parseFloat(newExpense.amount)
      if (isNaN(amount) || amount <= 0) {
        toast({
          title: "Erreur",
          description: "Le montant doit être un nombre positif",
          variant: "destructive",
        })
        return
      }

      // Vérifier que la somme des parts est égale au montant total
      const totalShares = Object.values(participantsShares).reduce((sum, share) => sum + share, 0)
      if (Math.abs(totalShares - amount) > 0.01) {
        toast({
          title: "Erreur",
          description: "La somme des parts doit être égale au montant total",
          variant: "destructive",
        })
        return
      }

      // Préparer les participants
      const participants = Object.entries(participantsShares).map(([userId, shareAmount]) => ({
        userId: Number.parseInt(userId),
        shareAmount,
      }))

      const formData = new FormData()
      formData.append("title", newExpense.title)
      formData.append("amount", newExpense.amount)
      formData.append("groupId", groupId.toString())
      formData.append("description", newExpense.description)
      formData.append("participants", JSON.stringify(participants))

      const result = await expenseApi.createExpense(formData) as Expense

      if (result) {
        toast({
          title: "Succès",
          description: "La dépense a été ajoutée avec succès",
        })

        // Recharger les dépenses
        const expenses = await expenseApi.getExpensesByEventId(groupId) as Expense[]
        setExpenses(expenses)

        // Recharger les soldes du groupe
        const balances = await expenseApi.getBalancesByGroupId(groupId) as Balance[]
        setBalances(balances)

        // Réinitialiser le formulaire
        setNewExpense({
          title: "",
          amount: "",
          description: "",
        })

        // Fermer la boîte de dialogue
        setDialogOpen(false)
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'ajout de la dépense",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la dépense:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la dépense",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des dépenses...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const totalExpenses = expenses.reduce((sum, expense: any) => sum + Number.parseFloat(expense.amount), 0)

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dépenses</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="befriend-button-primary">
              <Plus className="mr-2 h-4 w-4" /> Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une dépense</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle dépense et répartissez-la entre les membres du groupe.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newExpense.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Courses, Restaurant..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (€)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={newExpense.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optionnelle)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    placeholder="Détails supplémentaires..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Répartition</Label>
                    <Button type="button" variant="outline" size="sm" onClick={distributeEvenly}>
                      Répartir équitablement
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {members.map((member: any) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {member.full_name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.full_name}</span>
                        </div>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={participantsShares[member.id] || ""}
                          onChange={(e) => handleShareChange(member.id, e.target.value)}
                          className="w-24"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="befriend-button-primary">
                  Ajouter la dépense
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="befriend-card">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Total des dépenses</h2>
            <span className="text-xl font-bold">{totalExpenses.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{expenses.length} dépenses</span>
            <span>{balances.length} personnes concernées</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="expenses">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses">
            <Receipt className="mr-2 h-4 w-4" /> Dépenses
          </TabsTrigger>
          <TabsTrigger value="balances">
            <ArrowLeftRight className="mr-2 h-4 w-4" /> Équilibres
          </TabsTrigger>
          <TabsTrigger value="summary">
            <PieChart className="mr-2 h-4 w-4" /> Résumé
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="mt-4 space-y-4">
          {expenses.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">Aucune dépense pour le moment</p>
              <Button className="mt-4 befriend-button-primary" onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter une dépense
              </Button>
            </div>
          ) : (
            expenses.map((expense: any) => (
              <Card key={expense.id} className="befriend-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{expense.title}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                    <span className="font-bold">{Number.parseFloat(expense.amount).toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span>Payé par</span>
                    <Avatar className="h-6 w-6 mx-2">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {expense.paid_by_name ? expense.paid_by_name.charAt(0) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{expense.paid_by_name || "Utilisateur"}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="balances" className="mt-4">
          <Card className="befriend-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Qui doit quoi à qui</h3>
              {balances.length === 0 ? (
                <p className="text-center text-muted-foreground">Aucun solde à afficher</p>
              ) : (
                <div className="space-y-4">
                  {balances
                    .filter((balance: any) => balance.balance < 0)
                    .map((debtor: any) => {
                      const creditor = balances.find((b: any) => b.balance > 0)
                      if (!creditor) return null

                      return (
                        <div key={debtor.user_id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {debtor.user_name ? debtor.user_name.charAt(0) : "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span>{debtor.user_name || "Utilisateur"}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-destructive font-medium">
                              {Math.abs(debtor.balance).toFixed(2)} €
                            </span>
                            <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                            <Avatar className="h-8 w-8 ml-2">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {creditor.user_name ? creditor.user_name.charAt(0) : "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="ml-2">{creditor.user_name || "Utilisateur"}</span>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="befriend-card mt-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Récapitulatif</h3>
              <div className="space-y-2">
                {balances.map((balance: any) => (
                  <div key={balance.user_id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {balance.user_name ? balance.user_name.charAt(0) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{balance.user_name || "Utilisateur"}</span>
                    </div>
                    <span
                      className={
                        balance.balance > 0
                          ? "text-green-500 font-medium"
                          : balance.balance < 0
                            ? "text-destructive font-medium"
                            : "text-muted-foreground"
                      }
                    >
                      {balance.balance > 0 ? "+" : ""}
                      {balance.balance.toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-4">
          <Card className="befriend-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Résumé des dépenses</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total des dépenses</span>
                  <span className="font-bold">{totalExpenses.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nombre de dépenses</span>
                  <span>{expenses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Personnes concernées</span>
                  <span>{balances.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
