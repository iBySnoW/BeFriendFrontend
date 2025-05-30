"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Users, Calendar, MessageSquare, Settings, FolderTree, ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatInterface } from "@/components/ChatInterface"
import { Badge } from "@/components/ui/badge"

export default function SubGroupPage({ params }: { params: { id: string; subgroupId: string } }) {
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
    members: [
      { id: "1", name: "Alice", avatar: "/placeholder.svg?height=40&width=40", role: "admin" },
      { id: "2", name: "Bob", avatar: "/placeholder.svg?height=40&width=40", role: "member" },
      { id: "3", name: "Charlie", avatar: "/placeholder.svg?height=40&width=40", role: "member" },
    ],
    events: [{ id: "1", name: "Réunion des anciens", date: "20 août" }],
  })

  // Fonction pour obtenir la classe de couleur
  const getColorClass = (colorId: string) => {
    switch (colorId) {
      case "pink":
        return "bg-pink-500"
      case "blue":
        return "bg-blue-500"
      case "green":
        return "bg-green-500"
      case "purple":
        return "bg-purple-500"
      case "orange":
        return "bg-orange-500"
      case "red":
        return "bg-red-500"
      case "yellow":
        return "bg-yellow-500"
      case "teal":
        return "bg-teal-500"
      default:
        return "bg-pink-500"
    }
  }

  return (
    <div className="min-h-screen">
      <div className="wireframe-status-bar">
        <div className="text-sm text-white">12:35</div>
        <div className="flex items-center gap-1">
          <div className="text-sm text-white">4G</div>
          <div className="w-6 h-3 bg-white rounded-sm" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href={`/groups/${params.id}`} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-white font-fredoka">{subGroup.name}</h1>
          <Link href={`/groups/${params.id}/subgroups/${params.subgroupId}/settings`}>
            <Settings className="w-6 h-6 text-white" />
          </Link>
        </div>

        <div className="wireframe-card p-4 mb-6">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full ${getColorClass(subGroup.themeColor)} flex items-center justify-center mr-3`}
            >
              <FolderTree className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-white">Sous-groupe de {subGroup.parentGroup.name}</h3>
                <Badge className="ml-2 bg-white/20 text-white text-xs">{subGroup.members.length} membres</Badge>
              </div>
              <Link href={`/groups/${params.id}`} className="text-sm text-white/60 flex items-center">
                <ArrowLeft className="h-3 w-3 mr-1" />
                Retour au groupe principal
              </Link>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <Card className="wireframe-card">
            <CardContent className="p-4">
              <p className="text-white/80">{subGroup.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 rounded-xl p-1">
              <TabsTrigger value="members" className="text-white data-[state=active]:bg-white/20">
                Membres
              </TabsTrigger>
              <TabsTrigger value="events" className="text-white data-[state=active]:bg-white/20">
                Événements
              </TabsTrigger>
              <TabsTrigger value="chat" className="text-white data-[state=active]:bg-white/20">
                Discussion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-white">Membres ({subGroup.members.length})</h2>
                  <Button variant="ghost" size="sm" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                    <Plus className="h-4 w-4 mr-1" />
                    Inviter
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {subGroup.members.map((member) => (
                    <Card key={member.id} className="wireframe-card">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="w-10 h-10 mr-3 bg-white/20">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{member.name}</p>
                            <p className="text-xs text-white/60">
                              {member.role === "admin" ? "Administrateur" : "Membre"}
                            </p>
                          </div>
                        </div>
                        {member.role === "admin" && <Badge className="bg-white/20 text-white">Admin</Badge>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-white">Événements ({subGroup.events.length})</h2>
                  <Link href={`/groups/${params.id}/subgroups/${params.subgroupId}/events/new`}>
                    <Button variant="ghost" size="sm" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                      <Plus className="h-4 w-4 mr-1" />
                      Créer
                    </Button>
                  </Link>
                </div>

                {subGroup.events.length > 0 ? (
                  <div className="space-y-3">
                    {subGroup.events.map((event) => (
                      <Card key={event.id} className="wireframe-card">
                        <CardContent className="p-4 flex items-center">
                          <Calendar className="w-10 h-10 text-white mr-3" />
                          <div>
                            <p className="font-medium text-white">{event.name}</p>
                            <p className="text-sm text-white/60">{event.date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 wireframe-card">
                    <Calendar className="h-12 w-12 text-white/40 mx-auto mb-3" />
                    <p className="text-white/60">Aucun événement pour ce sous-groupe</p>
                    <Button className="mt-4 wireframe-button">
                      <Plus className="h-4 w-4 mr-2" />
                      Créer un événement
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="chat" className="mt-4 h-[60vh] wireframe-card overflow-hidden">
              <ChatInterface chatName={`Discussion - ${subGroup.name}`} />
            </TabsContent>
          </Tabs>

          <div className="flex space-x-4">
            <Link href={`/groups/${params.id}/subgroups/${params.subgroupId}/chat`} className="flex-1">
              <Button className="w-full wireframe-button">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussion
              </Button>
            </Link>
            <Button className="flex-1 wireframe-button">
              <Users className="w-4 h-4 mr-2" />
              Inviter
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
