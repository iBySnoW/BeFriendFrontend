"use client"

import type React from "react"

import { useState } from "react"
import type { Expense, Participant, ExpenseCategory } from "@/types/expense"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Car, Home, Ticket, Gift, MoreHorizontal, Camera, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

interface AddExpenseFormProps {
  participants: Participant[]
  eventId?: string
  onAddExpense: (expense: Omit<Expense, "id" | "date">) => void
  onCancel: () => void
}

export function AddExpenseForm({ participants, eventId, onAddExpense, onCancel }: AddExpenseFormProps) {
  const { toast } = useToast()
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [paidBy, setPaidBy] = useState(participants[0]?.id || "")
  const [paidFor, setPaidFor] = useState<string[]>(participants.map((p) => p.id))
  const [category, setCategory] = useState<ExpenseCategory>("other")
  const [receipt, setReceipt] = useState<string | undefined>(undefined)
  const [isEqualSplit, setIsEqualSplit] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!description || !amount || !paidBy || paidFor.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newExpense: Omit<Expense, "id" | "date"> = {
      description,
      amount: Number.parseFloat(amount),
      paidBy,
      paidFor,
      category,
      eventId,
      receipt,
    }

    onAddExpense(newExpense)
    toast({
      title: "Dépense ajoutée",
      description: "La dépense a été ajoutée avec succès",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dans une application réelle, nous téléchargerions le fichier sur un serveur
      // et utiliserions l'URL retournée. Ici, nous utilisons un URL local temporaire.
      const imageUrl = URL.createObjectURL(file)
      setReceipt(imageUrl)
    }
  }

  const toggleParticipant = (participantId: string) => {
    if (paidFor.includes(participantId)) {
      setPaidFor(paidFor.filter((id) => id !== participantId))
    } else {
      setPaidFor([...paidFor, participantId])
    }
  }

  const selectAllParticipants = () => {
    setPaidFor(participants.map((p) => p.id))
  }

  const deselectAllParticipants = () => {
    setPaidFor([])
  }

  const categories: { value: ExpenseCategory; label: string; icon: React.ReactNode }[] = [
    { value: "food", label: "Nourriture", icon: <ShoppingCart className="h-5 w-5" /> },
    { value: "transport", label: "Transport", icon: <Car className="h-5 w-5" /> },
    { value: "accommodation", label: "Logement", icon: <Home className="h-5 w-5" /> },
    { value: "activity", label: "Activité", icon: <Ticket className="h-5 w-5" /> },
    { value: "gift", label: "Cadeau", icon: <Gift className="h-5 w-5" /> },
    { value: "other", label: "Autre", icon: <MoreHorizontal className="h-5 w-5" /> },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="description" className="text-white">
            Description
          </Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Dîner au restaurant"
            className="wireframe-input"
            required
          />
        </div>

        <div>
          <Label htmlFor="amount" className="text-white">
            Montant
          </Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="wireframe-input pl-8"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">€</span>
          </div>
        </div>

        <div>
          <Label className="text-white mb-2 block">Catégorie</Label>
          <RadioGroup
            value={category}
            onValueChange={(value) => setCategory(value as ExpenseCategory)}
            className="grid grid-cols-3 gap-3"
          >
            {categories.map((cat) => (
              <div key={cat.value}>
                <RadioGroupItem value={cat.value} id={`category-${cat.value}`} className="sr-only" />
                <Label
                  htmlFor={`category-${cat.value}`}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg wireframe-card cursor-pointer ${
                    category === cat.value ? "bg-white/30" : ""
                  }`}
                >
                  <div className="mb-2 text-white">{cat.icon}</div>
                  <span className="text-xs text-white">{cat.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className="text-white mb-2 block">Payé par</Label>
          <div className="wireframe-card p-2">
            <RadioGroup value={paidBy} onValueChange={setPaidBy} className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10">
                  <RadioGroupItem value={participant.id} id={`paidBy-${participant.id}`} className="text-white" />
                  <Label htmlFor={`paidBy-${participant.id}`} className="flex items-center cursor-pointer">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-white/20 text-white">{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-white">{participant.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label className="text-white">Concerné(s)</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs wireframe-button"
                onClick={selectAllParticipants}
              >
                Tous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs wireframe-button"
                onClick={deselectAllParticipants}
              >
                Aucun
              </Button>
            </div>
          </div>
          <div className="wireframe-card p-2">
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10">
                  <Checkbox
                    id={`paidFor-${participant.id}`}
                    checked={paidFor.includes(participant.id)}
                    onCheckedChange={() => toggleParticipant(participant.id)}
                    className="text-white"
                  />
                  <Label htmlFor={`paidFor-${participant.id}`} className="flex items-center cursor-pointer">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-white/20 text-white">{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-white">{participant.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label className="text-white mb-2 block">Reçu (optionnel)</Label>
          <div className="relative">
            {receipt ? (
              <div className="relative">
                <div className="h-40 bg-white/10 rounded-lg overflow-hidden">
                  <img src={receipt || "/placeholder.svg"} alt="Reçu" className="w-full h-full object-contain" />
                </div>
                <button
                  type="button"
                  onClick={() => setReceipt(undefined)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-40 wireframe-card cursor-pointer">
                <Camera className="h-8 w-8 text-white/60 mb-2" />
                <span className="text-white/60">Ajouter une photo du reçu</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 wireframe-button" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="flex-1 wireframe-button">
          Ajouter la dépense
        </Button>
      </div>
    </form>
  )
}
