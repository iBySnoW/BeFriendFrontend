"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { groupApi } from "@/lib/api/group"
import type { Group } from '@/types/group'

interface CreateGroupResponse {
  success: boolean
  error?: string
}

export default function NewGroupPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [inviteLink, setInviteLink] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1. Créer le groupe
    const group = await groupApi.createGroup({ name, description }) as Group
    if (group && group.id) {
      // 2. Générer le lien d'invitation
      const invitation = await groupApi.inviteToGroup(group.id, { phone: "" }) as any
      setInviteLink(invitation.link)
      setLoading(false)
    } else {
      setLoading(false)
      // Gérer l'erreur
    }
  }

  return (
    <div className="">
      <div className="p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-foreground">Créer un groupe</h1>
          <p className="text-textSecondary mt-1">Créez un nouveau groupe pour organiser vos événements</p>
         
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-card rounded-xl shadow-md">
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <Button type="button" variant="outline" className="rounded-full text-sm border-primary text-primary">
                  Changer l'icône
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">Nom du groupe</Label>
                <Input
                  id="name"
                  placeholder="Ex: Famille, Amis proches..."
                  className="bg-background border border-neutral-100 rounded-lg text-base focus:border-primary focus:ring-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base">Description (optionnelle)</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre groupe en quelques mots..."
                  className="min-h-[100px] rounded-lg bg-background border border-neutral-100 text-base focus:border-primary focus:ring-primary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold text-base shadow-md" disabled={loading}>
            {loading ? "Création en cours..." : "Créer le groupe"}
          </Button>
           <p className="text-sm text-muted-foreground mt-1">Un lien d'invitation sera généré automatiquement</p>
        </form>

        {inviteLink && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="font-semibold mb-2 text-bac">Lien d'invitation généré :</p>
            <p className="text-sm text-green-900 mb-2">Partagez ce lien avec vos amis ou contacts pour les inviter à rejoindre ce groupe !</p>
            <Input value={inviteLink} readOnly className="mb-2" />
            <Button onClick={() => navigator.clipboard.writeText(inviteLink)}>
              Copier le lien
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
