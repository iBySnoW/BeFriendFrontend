"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  MessageSquare, 
  Share2, 
  Users, 
  ChevronRight, 
  UserCircle,
  CreditCard,
  ChevronLeft
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Event } from "@/types/event"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Event as EventType, EventParticipant } from "@/types/event"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Extension locale du type Event pour le mock
interface MockExpense {
  id: number;
  label: string;
  amount: number;
  paid_by: number;
  participants: number[];
}
interface EventWithExpenses extends EventType {
  expenses: MockExpense[];
}

export default function EventPage() {
  const router = useRouter()
  const { id } = useParams()
  const [event, setEvent] = useState<EventWithExpenses | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [pool, setPool] = useState<any>(null)
  const [contribDialogOpen, setContribDialogOpen] = useState(false)
  const [contribAmount, setContribAmount] = useState("")
  const [contribLoading, setContribLoading] = useState(false)

  // --- MOCK DATA ---
  useEffect(() => {
    setTimeout(() => {
      const now = new Date()
      // Utilisateurs
      const mockUser1 = {
        id: 1,
        full_name: "Alice Dupont",
        avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
        email: "alice@example.com",
        username: "alice",
      }
      const mockUser2 = {
        id: 2,
        full_name: "Paul Martin",
        avatar_url: "https://randomuser.me/api/portraits/men/45.jpg",
        email: "paul@example.com",
        username: "paul",
      }
      const mockUser3 = {
        id: 3,
        full_name: "Sophie Bernard",
        avatar_url: "https://randomuser.me/api/portraits/women/46.jpg",
        email: "sophie@example.com",
        username: "sophie",
      }
      // Membres du groupe
      const mockGroupMembers = [
        {
          id: 1,
          group_id: 1,
          user_id: 1,
          role: "admin" as const,
          joined_at: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          user: mockUser1,
        },
        {
          id: 2,
          group_id: 1,
          user_id: 2,
          role: "member" as const,
          joined_at: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
          user: mockUser2,
        },
        {
          id: 3,
          group_id: 1,
          user_id: 3,
          role: "member" as const,
          joined_at: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
          user: mockUser3,
        },
      ]
      // Groupe
      const mockGroup = {
        id: 1,
        name: "Amis de Paul",
        description: "Le groupe des amis proches de Paul",
        avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
        created_by: 1,
        visibility: "PRIVATE" as const,
        created_at: now,
        updated_at: now,
        members: mockGroupMembers,
        creator: mockUser1,
      }
      // Participants à l'événement
      const mockParticipants: EventParticipant[] = [
        {
          id: 1,
          event_id: 1,
          user_id: 1,
          status: 'accepted' as const,
          joined_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
          user: mockUser1,
        },
        {
          id: 2,
          event_id: 1,
          user_id: 2,
          status: 'pending' as const,
          joined_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          user: mockUser2,
        },
        {
          id: 3,
          event_id: 1,
          user_id: 3,
          status: 'declined' as const,
          joined_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
          user: mockUser3,
        },
      ]
      // Dépenses mockées
      const mockExpenses: MockExpense[] = [
        {
          id: 1,
          label: "Gâteau d'anniversaire",
          amount: 30,
          paid_by: 1,
          participants: [1, 2, 3],
        },
        {
          id: 2,
          label: "Décorations",
          amount: 20,
          paid_by: 2,
          participants: [1, 2],
        },
        {
          id: 3,
          label: "Boissons",
          amount: 15,
          paid_by: 3,
          participants: [2, 3],
        },
      ]
      // Événement
      const mockEvent: EventWithExpenses = {
        id: Number(id),
        title: "Anniversaire de Paul",
        description: "Venez fêter l'anniversaire de Paul avec nous ! 🎉",
        start_date: now,
        end_date: new Date(now.getTime() + 2 * 60 * 60 * 1000),
        group_id: 1,
        created_by: 1,
        status: "UPCOMING" as const,
        visibility: "PRIVATE" as const,
        created_at: now,
        updated_at: now,
        group: mockGroup,
        creator: mockUser1,
        participants: mockParticipants,
        expenses: mockExpenses,
      }
      // Mock pool/cagnotte
      const mockPool = {
        id: 1,
        title: "Cagnotte pour le cadeau de Paul",
        targetAmount: 100,
        currentAmount: 65,
        currency: "€",
        contributors: [
          { id: 1, name: "Alice Dupont", amount: 20 },
          { id: 2, name: "Paul Martin", amount: 25 },
          { id: 3, name: "Sophie Bernard", amount: 20 },
        ],
      }
      setEvent(mockEvent)
      setPool(mockPool)
      setLoading(false)
    }, 500)
  }, [id])
  // --- FIN MOCK DATA ---

  // Simule l'ajout d'une contribution
  const handleContribute = () => {
    if (!pool || !contribAmount || isNaN(Number(contribAmount)) || Number(contribAmount) <= 0) return
    setContribLoading(true)
    setTimeout(() => {
      setPool((prev: any) => ({
        ...prev,
        currentAmount: prev.currentAmount + Number(contribAmount),
        contributors: [
          ...prev.contributors,
          { id: Date.now(), name: "Vous", amount: Number(contribAmount) },
        ],
      }))
      setContribDialogOpen(false)
      setContribAmount("")
      setContribLoading(false)
    }, 800)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-muted rounded-full" />
          <div className="h-12 w-3/4 bg-muted rounded-xl" />
          <div className="h-4 w-1/2 bg-muted rounded-full" />
          <div className="h-4 w-1/3 bg-muted rounded-full" />
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background p-4 flex flex-col items-center justify-center space-y-4"
      >
        <p className="text-destructive text-lg">{error || "Événement non trouvé"}</p>
        <Button onClick={() => router.back()} className="rounded-full px-6">
          Retour
        </Button>
      </motion.div>
    )
  }

  return (
    <div>
       {/* Header sticky moderne */}
       <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-5">
          <button
            onClick={() => router.back?.()}
            className="rounded-full bg-primary/10 hover:bg-primary/20 p-2 transition shadow"
            aria-label="Retour"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-fredoka flex-1">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
        >
          <Button 
            className="flex-1 rounded-full h-12 bg-background text-destructive-foreground font-bold text-base shadow-lg hover:bg-destructive/90 focus:ring-2 focus:ring-destructive focus:outline-none transition"
            variant="destructive"
            aria-label="Envoyer une note"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Envoyer une note
          </Button>
          <Button 
            className="flex-1 rounded-full h-12 bg-primary text-primary-foreground font-bold text-base shadow-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:outline-none transition"
            aria-label="Partager l'événement"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Partager
          </Button>
        </motion.div>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="w-full p-1 bg-card rounded-full shadow-md">
            <TabsTrigger 
              value="details" 
              className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-primary font-semibold text-base transition"
            >
              Détails
            </TabsTrigger>
            <TabsTrigger 
              value="participants" 
              className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-primary font-semibold text-base transition"
            >
              Participants
            </TabsTrigger>
            <TabsTrigger 
              value="expenses" 
              className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-primary font-semibold text-base transition"
            >
              Dépenses
            </TabsTrigger>
            <TabsTrigger 
              value="pool" 
              className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-primary font-semibold text-base transition"
            >
              Cagnotte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Organizer Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                    <UserCircle className="h-5 w-5 text-primary" />
                    Organisé par
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/40 shadow-md">
                      <AvatarImage src={event.creator?.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {event.creator?.full_name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-lg text-foreground">{event.creator?.full_name}</p>
                      <p className="text-sm text-muted-foreground">Créateur de l'événement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Description */}
            {event.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary font-bold">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Date & Heure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="4" strokeWidth="2" /><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" /></svg>
                    Date & heure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {format(new Date(event.start_date), "EEEE d MMMM yyyy", { locale: fr })}
                      </span>
                      <span className="text-muted-foreground">
                        Début : {format(new Date(event.start_date), "HH:mm", { locale: fr })}
                      </span>
                      {event.end_date && (
                        <span className="text-muted-foreground">
                          Fin : {format(new Date(event.end_date), (format(new Date(event.start_date), 'd MMMM yyyy', { locale: fr }) !== format(new Date(event.end_date), 'd MMMM yyyy', { locale: fr }) ? "d MMMM yyyy, " : "") + "HH:mm", { locale: fr })}
                        </span>
                      )}
                    </div>
                    <Badge
                      className="rounded-full px-3 py-1 font-semibold text-xs ml-auto"
                      variant={event.status === 'UPCOMING' ? 'default' : event.status === 'ONGOING' ? 'secondary' : 'destructive'}
                    >
                      {event.status === 'UPCOMING' ? 'À venir' : event.status === 'ONGOING' ? 'En cours' : 'Terminé'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Group Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                    <Users className="h-5 w-5 text-primary" />
                    Groupe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/40 shadow-md">
                      <AvatarImage src={event.group?.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {event.group?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-lg text-foreground">{event.group?.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.group?.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none transition" aria-label="Voir le groupe">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  </CardContent>
                </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="participants" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                      <Users className="h-5 w-5 text-primary" />
                      Participants
                    </CardTitle>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 bg-primary/10 text-primary font-bold">
                      {event.participants?.length || 0} participant{event.participants?.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex -space-x-4 mb-4">
                    {event.participants?.slice(0, 5).map((participant, idx) => (
                      <Avatar key={participant.id} className={cn("border-2 border-background shadow", idx === 0 && "z-10") + " w-10 h-10"}>
                        <AvatarImage src={participant.user.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {participant.user.full_name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {event.participants && event.participants.length > 5 && (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted border-2 border-background text-xs font-bold text-muted-foreground z-0">
                        +{event.participants.length - 5}
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {event.participants?.map((participant, index) => (
                      <motion.div
                        key={participant.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border-2 border-primary/40 shadow-md">
                            <AvatarImage src={participant.user.avatar_url} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {participant.user.full_name?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-lg text-foreground">{participant.user.full_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(participant.joined_at), "d MMM yyyy", { locale: fr })}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={participant.status === 'accepted' ? 'default' : 'secondary'}
                          className={cn(
                            "rounded-full px-3 py-1 font-semibold text-xs",
                            participant.status === 'accepted' && "bg-primary/10 text-primary border border-primary",
                            participant.status === 'pending' && "bg-amber-500/10 text-amber-500 border border-amber-500",
                            participant.status === 'declined' && "bg-destructive/10 text-destructive border border-destructive"
                          )}
                        >
                          {participant.status === 'accepted' ? 'Accepté' : participant.status === 'pending' ? 'En attente' : 'Refusé'}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
              </CardContent>
            </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Dépenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {event.expenses && event.expenses.length > 0 ? (
                    <div className="space-y-4">
                      {event.expenses.map((expense) => {
                        const payer = event.participants.find(p => p.user_id === expense.paid_by)?.user
                        return (
                          <div key={expense.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                            <div>
                              <div className="font-semibold text-foreground">{expense.label}</div>
                              <div className="text-sm text-muted-foreground">
                                Payé par {payer ? payer.full_name : 'Inconnu'}
                                {expense.participants && (
                                  <span> • Pour {expense.participants.length} participant{expense.participants.length > 1 ? 's' : ''}</span>
                                )}
                              </div>
                            </div>
                            <div className="font-bold text-primary text-lg">{expense.amount} €</div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-4">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-muted-foreground mb-4">Aucune dépense pour le moment</p>
                      <Button variant="outline" className="rounded-full font-bold text-primary border-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none transition" aria-label="Ajouter une dépense">
                        Ajouter une dépense
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="pool" className="space-y-6">
            <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                  💰 Cagnotte
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pool && (
                  <>
                    <div className="mb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Objectif :</span>
                        <span>{pool.targetAmount} {pool.currency}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Collecté :</span>
                        <span>{pool.currentAmount} {pool.currency}</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold mb-1">Contributeurs :</div>
                      <ul className="space-y-1">
                        {pool.contributors.map((c: any) => (
                          <li key={c.id} className="flex justify-between">
                            <span>{c.name}</span>
                            <span className="font-medium">{c.amount} {pool.currency}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Dialog open={contribDialogOpen} onOpenChange={setContribDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="mt-4 w-full bg-primary text-primary-foreground rounded-lg font-semibold">
                          Contribuer
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contribuer à la cagnotte</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            placeholder="Montant (€)"
                            value={contribAmount}
                            onChange={e => setContribAmount(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <DialogFooter>
                          <Button onClick={handleContribute} disabled={contribLoading || !contribAmount || Number(contribAmount) <= 0} className="w-full">
                            {contribLoading ? "Contribution en cours..." : "Valider ma contribution"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
