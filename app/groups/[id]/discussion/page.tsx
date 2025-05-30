"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Settings, MessageSquare, UserPlus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "next/navigation"

export default function GroupDiscussionPage() {
  const params = useParams()
  const id = params.id as unknown as number   
  const [group] = useState({
    id,
    name: "Amis du lycée",
    description: "Groupe pour rester en contact avec nos amis du lycée",
  })

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: {
        name: "Alice",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      content: "Salut tout le monde ! Comment allez-vous ?",
      timestamp: new Date("2024-02-14T10:00:00"),
    },
    {
      id: "2",
      sender: {
        name: "Bob",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      content: "Très bien ! On se voit toujours samedi ?",
      timestamp: new Date("2024-02-14T10:05:00"),
    },
    {
      id: "3",
      sender: {
        name: "Chloé",
        avatar: "https://randomuser.me/api/portraits/women/46.jpg",
      },
      content: "Oui, rdv à 19h au resto 🍕",
      timestamp: new Date("2024-02-14T10:07:00"),
    },
    {
      id: "4",
      sender: {
        name: "Vous",
        avatar: "/placeholder.svg",
      },
      content: "Je peux venir un peu plus tard, j'ai un rendez-vous avant.",
      timestamp: new Date("2024-02-14T10:10:00"),
    },
    {
      id: "5",
      sender: {
        name: "Alice",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      content: "Pas de souci ! On t'attendra pour le dessert 😄",
      timestamp: new Date("2024-02-14T10:12:00"),
    },
    // Messages du lendemain
    {
      id: "6",
      sender: {
        name: "Bob",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      content: "Vous avez vu la météo pour samedi ? Il va pleuvoir... ☔️",
      timestamp: new Date("2024-02-15T09:00:00"),
    },
    {
      id: "7",
      sender: {
        name: "Chloé",
        avatar: "https://randomuser.me/api/portraits/women/46.jpg",
      },
      content: "On peut peut-être changer pour un resto en intérieur ?",
      timestamp: new Date("2024-02-15T09:05:00"),
    },
    {
      id: "8",
      sender: {
        name: "Vous",
        avatar: "/placeholder.svg",
      },
      content: "Bonne idée ! Je connais un super italien pas loin.",
      timestamp: new Date("2024-02-15T09:10:00"),
    },
    {
      id: "9",
      sender: {
        name: "Alice",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      content: "Parfait pour moi !",
      timestamp: new Date("2024-02-15T09:12:00"),
    },
    {
      id: "10",
      sender: {
        name: "Bob",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      content: "On valide alors ? 🍝",
      timestamp: new Date("2024-02-15T09:15:00"),
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      sender: {
        name: "Vous",
        avatar: "/placeholder.svg",
      },
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
   <div className="flex flex-col h-[calc(100vh-2rem)]">
        <div className="p-4">
          <div className="flex items-center justify-left gap-2 mb-4">
            <Link href={`/groups/${id}`} className="text-white">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-white font-fredoka">{group.name}</h1>
          </div>

          <p className="text-white/60 text-sm mb-4">{group.description}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary-950/20">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.sender.name === "Vous" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8 bg-white/20">
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback className="text-white">{message.sender.name[0]}</AvatarFallback>
              </Avatar>
              <div className={`flex flex-col max-w-[70%] ${message.sender.name === "Vous" ? "items-end" : ""}`}>
                <div
                  className={`rounded-2xl p-3 ${
                    message.sender.name === "Vous" ? "bg-secondary text-primary-950" : "bg-white/10 text-white"
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{message.sender.name}</p>
                  <p>{message.content}</p>
                </div>
                <span className="text-xs text-white/60 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-primary-950/10">
          <div className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message"
              className="flex-1 wireframe-input"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white" onClick={handleSend}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
    </div>
  )
}
