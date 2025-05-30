"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Plus, ImageIcon, MapPin, Smile } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  content: string
  timestamp: Date
  read: boolean
  attachments?: {
    type: "image" | "location"
    url?: string
    location?: string
  }[]
}

interface ChatInterfaceProps {
  chatName?: string
  initialMessages?: Message[]
  currentUserId?: string
}

export function ChatInterface({
  chatName = "Discussion",
  initialMessages = [],
  currentUserId = "current-user",
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: "1",
            sender: {
              id: "user1",
              name: "Alice",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "Salut tout le monde ! Comment allez-vous ?",
            timestamp: new Date(Date.now() - 3600000),
            read: true,
          },
          {
            id: "2",
            sender: {
              id: "user2",
              name: "Bob",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "Très bien ! On se voit toujours samedi ?",
            timestamp: new Date(Date.now() - 1800000),
            read: true,
            attachments: [
              {
                type: "location",
                location: "Café du Centre, Nantes",
              },
            ],
          },
          {
            id: "3",
            sender: {
              id: currentUserId,
              name: "Vous",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: "Oui, c'est toujours bon pour moi !",
            timestamp: new Date(Date.now() - 900000),
            read: true,
          },
        ],
  )

  const [newMessage, setNewMessage] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: currentUserId,
        name: "Vous",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newMessage,
      timestamp: new Date(),
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      {chatName && (
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-semibold text-slate-800">{chatName}</h2>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-beige-50">
        <AnimatePresence>
          {messages.map((message) => {
            const isCurrentUser = message.sender.id === currentUserId

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8 bg-slate-200">
                  <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-slate-600">{message.sender.name[0]}</AvatarFallback>
                </Avatar>

                <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? "items-end" : ""}`}>
                  <div className={isCurrentUser ? "chat-message-mine" : "chat-message-others"}>
                    <p className="text-sm font-medium mb-1">{message.sender.name}</p>
                    <p>{message.content}</p>

                    {message.attachments?.map((attachment, index) => (
                      <div key={index} className="mt-2">
                        {attachment.type === "location" && (
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {attachment.location}
                          </div>
                        )}
                        {attachment.type === "image" && attachment.url && (
                          <img
                            src={attachment.url || "/placeholder.svg"}
                            alt="Attachment"
                            className="rounded-lg max-w-full h-auto mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center mt-1 space-x-1">
                    <span className="chat-timestamp">{formatTime(message.timestamp)}</span>
                    {isCurrentUser && <span className="chat-timestamp">{message.read ? "✓✓" : "✓"}</span>}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-white border-t-slate-200">
              <SheetHeader>
                <SheetTitle className="text-slate-800">Ajouter du contenu</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-4 gap-4 p-4">
                <Button
                  variant="outline"
                  className="aspect-square flex flex-col gap-2 bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  <ImageIcon className="h-6 w-6" />
                  Photo
                </Button>
                <Button
                  variant="outline"
                  className="aspect-square flex flex-col gap-2 bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  <MapPin className="h-6 w-6" />
                  Lieu
                </Button>
                <Button
                  variant="outline"
                  className="aspect-square flex flex-col gap-2 bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  <Smile className="h-6 w-6" />
                  Emoji
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Message"
            className="flex-1 befriend-input"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-coral-500 text-white hover:bg-coral-600"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
