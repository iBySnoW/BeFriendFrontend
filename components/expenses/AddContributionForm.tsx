"use client"

import type React from "react"

import { useState } from "react"
import type { Pool, Participant, Contribution } from "@/types/expense"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TrendingUp } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCurrency } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface AddContributionFormProps {
  pool: Pool
  participants: Participant[]
  currentUserId: string
  onAddContribution: (poolId: string, contribution: Omit<Contribution, "id" | "date">) => void
  onCancel: () => void
}

export function AddContributionForm({
  pool,
  participants,
  currentUserId,
  onAddContribution,
  onCancel,
}: AddContributionFormProps) {
  const { toast } = useToast()
  const [participantId, setParticipantId] = useState(currentUserId)
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!participantId || !amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newContribution: Omit<Contribution, "id" | "date"> = {
      participantId,
      amount: Number.parseFloat(amount),
      message,
    }

    onAddContribution(pool.id, newContribution)
    toast({
      title: "Contribution ajoutée",
      description: "Votre contribution a été ajoutée avec succès",
    })
  }

  const getProgressPercentage = () => {
    if (!pool.targetAmount) return 100
    return Math.min(100, (pool.currentAmount / pool.targetAmount) * 100)
  }

  const getParticipantById = (id: string) => {
    return participants.find((p) => p.id === id) || { id, name: "Inconnu" }
  }

  const remainingAmount = pool.targetAmount ? pool.targetAmount - pool.currentAmount : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="wireframe-card p-4">
        <h3 className="font-medium text-white mb-2">{pool.name}</h3>
        {pool.description && <p className="text-white/60 mb-3">{pool.description}</p>}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Progression</span>
            <span className="text-white font-medium">
              {formatCurrency(pool.currentAmount)}
              {pool.targetAmount ? ` / ${formatCurrency(pool.targetAmount)}` : ""}
            </span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2 bg-white/10" indicatorClassName="bg-white" />
          {pool.targetAmount && (
            <p className="text-sm text-white/60">
              {getProgressPercentage().toFixed(0)}% de l'objectif atteint
              {remainingAmount > 0 && ` (${formatCurrency(remainingAmount)} restants)`}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-white mb-2 block">Contribuer en tant que</Label>
          <div className="wireframe-card p-2">
            <RadioGroup value={participantId} onValueChange={setParticipantId} className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10">
                  <RadioGroupItem value={participant.id} id={`participant-${participant.id}`} className="text-white" />
                  <Label htmlFor={`participant-${participant.id}`} className="flex items-center cursor-pointer">
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
          <Label htmlFor="message" className="text-white">
            Message (optionnel)
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ex: Bon anniversaire !"
            className="wireframe-input resize-none"
            rows={2}
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 wireframe-button" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="flex-1 wireframe-button">
          <TrendingUp className="h-4 w-4 mr-2" />
          Contribuer
        </Button>
      </div>
    </form>
  )
}
