"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Edit, Trash2, Shield, UserPlus, LogOut, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SubGroupSettingsPage({ params }: { params: { id: string; subgroupId: string } }) {
  const { toast } = useToast()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [subGroup] = useState({
    id: params.subgroupId,
    name: "Classe de Terminale",
    description: "Anciens de la Terminale S2",
    parentGroup: {
      id: params.id,
      name: "Amis du lycée",
    },
    themeColor: "blue",
    icon: "users",
    inheritPermissions: true,
    members: [
      { id: "1", name: "Alice", avatar: "/placeholder.svg?height=40&width=40", role: "admin" },
      { id: "2", name: "Bob", avatar: "/placeholder.svg?height=40&width=40", role: "member" },
      { id: "3", name: "Charlie", avatar: "/placeholder.svg?height=40&width=40", role: "member" },
    ],
  })

  const handleDeleteSubGroup = () => {
    // Simuler la suppression
    toast({
      title: "Sous-groupe supprimé",
      description: "Le sous-groupe a été supprimé avec succès.",
    })
    // Rediriger vers la page du groupe parent
    window.location.href = `/groups/${params.id}`
  }

  const handleLeaveSubGroup = () => {
    toast({
      title: "Vous avez quitté le sous-groupe",
      description: "Vous avez quitté le sous-groupe avec succès.",
    })
    // Rediriger vers la page du groupe parent
    window.location.href = `/groups/${params.id}`
  }

  const handleTogglePermissions = (checked: boolean) => {
    toast({
      title: checked ? "Permissions héritées" : "Permissions personnalisées",
      description: checked
        ? "Le sous-groupe hérite maintenant des permissions du groupe parent."
        : "Le sous-groupe utilise maintenant des permissions personnalisées.",
    })
  }

  return (
    <div className="wireframe-gradient min-h-screen">
      <div className="wireframe-status-bar">
        <div className="text-sm text-white">12:35</div>
        <div className="flex items-center gap-1">
          <div className="text-sm text-white">4G</div>
          <div className="w-6 h-3 bg-white rounded-sm" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <Link href={`/groups/${params.id}/subgroups/${params.subgroupId}`} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-white font-fredoka">Paramètres</h1>
          <div className="w-6 h-6"></div> {/* Spacer pour l'alignement */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <Card className="wireframe-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-white">{subGroup.name}</h2>
                  <p className="text-sm text-white/60">Sous-groupe de {subGroup.parentGroup.name}</p>
                </div>
                <Link href={`/groups/${params.id}/subgroups/${params.subgroupId}/edit`}>
                  <Button variant="ghost" size="sm" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Membres et permissions</h2>

            <div className="flex items-center justify-between p-4 wireframe-card">
              <Label htmlFor="inherit-permissions" className="flex items-center gap-3 cursor-pointer">
                <ArrowUpDown className="w-5 h-5 text-white/60" />
                <div>
                  <span className="text-white">Hériter des permissions du groupe parent</span>
                  <p className="text-xs text-white/60">
                    Utiliser les mêmes rôles et permissions que {subGroup.parentGroup.name}
                  </p>
                </div>
              </Label>
              <Switch
                id="inherit-permissions"
                checked={subGroup.inheritPermissions}
                onCheckedChange={handleTogglePermissions}
                className="data-[state=checked]:bg-white"
              />
            </div>

            <Card className="wireframe-card">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-white">Administrateurs</h3>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                    Gérer
                  </Button>
                </div>

                <div className="space-y-3">
                  {subGroup.members
                    .filter((member) => member.role === "admin")
                    .map((admin) => (
                      <div key={admin.id} className="flex items-center">
                        <Avatar className="w-8 h-8 mr-3 bg-white/20">
                          <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                          <AvatarFallback>{admin.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white">{admin.name}</p>
                          <p className="text-xs text-white/60">Administrateur</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Link href={`/groups/${params.id}/subgroups/${params.subgroupId}/members`}>
              <Button className="w-full wireframe-button">
                <UserPlus className="w-4 h-4 mr-2" />
                Gérer les membres
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Sécurité</h2>

            <Link href={`/groups/${params.id}/subgroups/${params.subgroupId}/permissions`}>
              <Card className="wireframe-card hover:bg-white/15 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-white/60 mr-3" />
                    <span className="text-white">Permissions avancées</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-white/60 rotate-180" />
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Actions</h2>

            <Button variant="outline" className="w-full wireframe-button" onClick={handleLeaveSubGroup}>
              <LogOut className="w-4 h-4 mr-2" />
              Quitter le sous-groupe
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer le sous-groupe
                </Button>
              </DialogTrigger>
              <DialogContent className="wireframe-gradient border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Supprimer le sous-groupe</DialogTitle>
                  <DialogDescription className="text-white/60">
                    Êtes-vous sûr de vouloir supprimer ce sous-groupe ? Cette action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" className="wireframe-button">
                    Annuler
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleDeleteSubGroup}
                  >
                    Supprimer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
