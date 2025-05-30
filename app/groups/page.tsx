"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GroupCard } from "@/components/GroupCard"

const groups = [
  { id: 1, name: "Famille", members: 5, color: "bg-primary/10" },
  { id: 2, name: "Amis proches", members: 8, color: "bg-secondary/10" },
  { id: 3, name: "Collègues", members: 12, color: "bg-primary/10" },
  { id: 4, name: "Club de sport", members: 20, color: "bg-secondary/10" },
  { id: 5, name: "Voisins", members: 7, color: "bg-primary/10" },
  { id: 6, name: "Association", members: 15, color: "bg-secondary/10" },
]

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <div className="p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground font-fredoka">Mes Groupes</h1>
          <Link href="/groups/new">
            <Button className="rounded-full w-10 h-10 p-0 befriend-gradient">
              <Plus className="h-5 w-5 text-white" />
            </Button>
          </Link>
        </header>

        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un groupe..."
              className="befriend-input pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-full aspect-square p-0 w-12 h-12 border-border">
            <Filter className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {groups
            .filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
        </div>
      </div>
    </div>
  )
}
