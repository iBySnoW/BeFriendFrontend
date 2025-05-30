"use client"

import type React from "react"

import { useState } from "react"
import type { Pool, Participant } from "@/types/expense"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface AddPoolFormProps {
  participants: Participant[]
  eventId?: string
  onCreatePool: (pool: Omit<Pool, "id" | "createdAt" | "currentAmount" | "contributions">) => void
  onCancel: () => void
}

export function AddPoolForm({ participants, eventId, onCreatePool, onCancel }: AddPoolFormProps) {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [hasDeadline, setHasDeadline] = useState(false)
  const [deadline, setDeadline] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(participants.map((p) => p.id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || selectedParticipants.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newPool: Omit<Pool, "id" | "createdAt" | "currentAmount" | "contributions"> = {
      name,
      description,
      targetAmount: targetAmount ? Number.parseFloat(targetAmount) : undefined,
      eventId,
      participants: participants.filter((p) => selectedParticipants.includes(p.id)),
      deadline: hasDeadline && deadline ? new Date(deadline) : undefined,
    }

    onCreatePool(newPool)
    toast({
      title: "Cagnotte créée",
      description: "La cagnotte a été créée avec succès",
    })
  }

  const toggleParticipant = (participantId: string) => {
    if (selectedParticipants.includes(participantId)) {
      setSelectedParticipants(selectedParticipants.filter((id) => id !== participantId))
    } else {
      setSelectedParticipants([...selectedParticipants, participantId])
    }
  }

  const selectAllParticipants = () => {
    setSelectedParticipants(participants.map((p) => p.id))
  }

  const deselectAllParticipants = () => {
    setSelectedParticipants([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-white">
            Nom de la cagnotte
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Cadeau d'anniversaire pour Marie"
            className="wireframe-input"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-white">
            Description (optionnelle)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Pour acheter un cadeau d'anniversaire"
            className="wireframe-input resize-none"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="targetAmount" className="text-white">
            Montant cible (optionnel)
          </Label>
          <div className="relative">
            <Input
              id="targetAmount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="wireframe-input pl-8"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">€</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasDeadline"
              checked={hasDeadline}
              onCheckedChange={(checked) => setHasDeadline(checked === true)}
              className="text-white"
            />
            <Label htmlFor="hasDeadline" className="text-white cursor-pointer">
              Définir une date limite
            </Label>
          </div>

          {hasDeadline && (
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="wireframe-input pl-10"
                required={hasDeadline}
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label className="text-white">Participants</Label>
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
                    id={`participant-${participant.id}`}
                    checked={selectedParticipants.includes(participant.id)}
                    onCheckedChange={() => toggleParticipant(participant.id)}
                    className="text-white"
                  />
                  <Label htmlFor={`participant-${participant.id}`} className="flex items-center cursor-pointer">
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
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="button" variant="outline" className="flex-1 wireframe-button" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="flex-1 wireframe-button">
          Créer la cagnotte
        </Button>
      </div>
    </form>
  )
}
