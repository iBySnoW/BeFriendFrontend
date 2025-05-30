"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Music, Book, Coffee, Heart, Star, Zap, Settings, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SubGroup {
  id: string
  name: string
  description?: string
  memberCount: number
  icon: string
  color: string
}

interface SubGroupListProps {
  subGroups: SubGroup[]
  groupId: string
}

export function SubGroupList({ subGroups, groupId }: SubGroupListProps) {
  // Fonction pour obtenir l'icône en fonction de l'ID
  const getIcon = (iconId: string) => {
    switch (iconId) {
      case "users":
        return <Users className="h-6 w-6" />
      case "music":
        return <Music className="h-6 w-6" />
      case "book":
        return <Book className="h-6 w-6" />
      case "coffee":
        return <Coffee className="h-6 w-6" />
      case "heart":
        return <Heart className="h-6 w-6" />
      case "star":
        return <Star className="h-6 w-6" />
      case "zap":
        return <Zap className="h-6 w-6" />
      case "settings":
        return <Settings className="h-6 w-6" />
      case "home":
        return <Home className="h-6 w-6" />
      default:
        return <Users className="h-6 w-6" />
    }
  }

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
    <div className="space-y-3">
      {subGroups.map((subGroup) => (
        <Link key={subGroup.id} href={`/groups/${groupId}/subgroups/${subGroup.id}`}>
          <Card className="wireframe-card hover:bg-white/15 transition-colors">
            <CardContent className="p-4 flex items-center">
              <div
                className={`w-12 h-12 rounded-full ${getColorClass(subGroup.color)} flex items-center justify-center mr-4`}
              >
                {getIcon(subGroup.icon)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center">
                  <h3 className="font-medium text-white">{subGroup.name}</h3>
                  <Badge className="ml-2 bg-white/20 text-white text-xs">{subGroup.memberCount} membres</Badge>
                </div>
                {subGroup.description && <p className="text-sm text-white/60">{subGroup.description}</p>}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
