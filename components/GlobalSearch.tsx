"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

type SearchResult = {
  id: string
  type: "group" | "event"
  name: string
  description?: string
}

const mockResults: SearchResult[] = [
  { id: "1", type: "group", name: "Famille", description: "Groupe familial" },
  { id: "2", type: "group", name: "Amis", description: "Groupe d'amis" },
  { id: "3", type: "event", name: "Anniversaire de Marie", description: "15 juin" },
  { id: "4", type: "event", name: "Réunion d'équipe", description: "1 juillet" },
]

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    if (result.type === "group") {
      router.push(`/groups/${result.id}`)
    } else {
      router.push(`/events/${result.id}`)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-white/60 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Rechercher...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} className="bg-primary-950/80 backdrop-blur-md border-none">
        <CommandInput placeholder="Rechercher un groupe ou un événement..." className="border-none text-white" />
        <CommandList className="bg-transparent">
          <CommandEmpty className="text-white/60">Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Groupes" className="text-white">
            {mockResults
              .filter((r) => r.type === "group")
              .map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result)}
                  className="hover:bg-white/20 cursor-pointer"
                >
                  <span className="text-white">{result.name}</span>
                  <span className="ml-2 text-sm text-white/60">{result.description}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Événements" className="text-white">
            {mockResults
              .filter((r) => r.type === "event")
              .map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result)}
                  className="hover:bg-white/20 cursor-pointer"
                >
                  <span className="text-white">{result.name}</span>
                  <span className="ml-2 text-sm text-white/60">{result.description}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
