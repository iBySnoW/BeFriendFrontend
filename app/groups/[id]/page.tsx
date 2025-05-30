"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Plus, Calendar, MessageCircle, Settings, Users, ChevronRight, CreditCard, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { eventApi } from "@/lib/api/event"
import { groupApi } from "@/lib/api/group"
import { Group, GroupMember } from "@/types/group"
import { Event } from "@/types/event"




export default function GroupDetailPage() {

  const params = useParams()
  const groupId = params.id as unknown as number
  const [events, setEvents] = useState<Event[]>([])
  const [group, setGroup] = useState<Group>()
  const [members, setMembers] = useState<GroupMember[]>([])

  // --- MOCK GROUP ---
  const mockGroup: Group = {
    id: groupId,
    name: "Amis du lycée",
    description: "Groupe pour rester en contact avec nos amis du lycée",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    created_by: 1,
    visibility: "PRIVATE",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-02-01"),
    members: [], // Les membres sont mockés séparément
    creator: {
      id: 1,
      full_name: "Alice Dupont",
      email: "alice@example.com",
      username: "alice",
      avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  }
  // --- FIN MOCK GROUP ---

  // --- MOCK MEMBERS ---
  const mockMembers: GroupMember[] = [
    {
      id: 1,
      group_id: groupId,
      user_id: 1,
      role: "admin",
      joined_at: new Date("2024-01-01"),
      user: {
        id: 1,
        full_name: "Alice Dupont",
        email: "alice@example.com",
        username: "alice",
        avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    },
    {
      id: 2,
      group_id: groupId,
      user_id: 2,
      role: "member",
      joined_at: new Date("2024-01-02"),
      user: {
        id: 2,
        full_name: "Bob Martin",
        email: "bob@example.com",
        username: "bob",
        avatar_url: "https://randomuser.me/api/portraits/men/45.jpg",
      },
    },
    {
      id: 3,
      group_id: groupId,
      user_id: 3,
      role: "member",
      joined_at: new Date("2024-01-03"),
      user: {
        id: 3,
        full_name: "Chloé Bernard",
        email: "chloe@example.com",
        username: "chloe",
        avatar_url: "https://randomuser.me/api/portraits/women/46.jpg",
      },
    },
  ]
  // --- FIN MOCK MEMBERS ---

  // --- MOCK EVENTS ---
  const mockEvents: Event[] = [
    {
      id: 1,
      title: "Soirée jeux de société",
      description: "Une soirée conviviale autour de jeux de société.",
      start_date: new Date("2024-03-20T19:00:00"),
      end_date: new Date("2024-03-20T23:00:00"),
      group_id: groupId,
      created_by: 1,
      status: "UPCOMING",
      visibility: "PRIVATE",
      created_at: new Date("2024-03-01"),
      updated_at: new Date("2024-03-01"),
      participants: [],
    },
    {
      id: 2,
      title: "Sortie au cinéma",
      description: "On va voir le dernier film à l'affiche !",
      start_date: new Date("2024-03-25T20:00:00"),
      end_date: new Date("2024-03-25T22:30:00"),
      group_id: groupId,
      created_by: 2,
      status: "UPCOMING",
      visibility: "PRIVATE",
      created_at: new Date("2024-03-05"),
      updated_at: new Date("2024-03-05"),
      participants: [],
    },
    {
      id: 3,
      title: "Pique-nique au parc",
      description: "Chacun apporte un plat à partager.",
      start_date: new Date("2024-04-02T12:00:00"),
      end_date: new Date("2024-04-02T15:00:00"),
      group_id: groupId,
      created_by: 3,
      status: "UPCOMING",
      visibility: "PRIVATE",
      created_at: new Date("2024-03-10"),
      updated_at: new Date("2024-03-10"),
      participants: [],
    },
  ]
  // --- FIN MOCK EVENTS ---

  useEffect(() => {
    setGroup(mockGroup)
    setMembers(mockMembers)
    setEvents(mockEvents)
  }, [groupId])

 

  return (
    
      <div className="p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">{group?.name}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/groups/${groupId}/settings`} className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <span className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Quitter le groupe</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <Link href={`/groups/${groupId}/discussion`}>
            <Card className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                <MessageCircle className="h-6 w-6 text-primary mb-2" />
                <span className="text-base font-medium text-foreground">Discussion</span>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/groups/${groupId}/expenses`}>
            <Card className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                <CreditCard className="h-6 w-6 text-primary mb-2" />
                <span className="text-base font-medium text-foreground">Dépenses</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-card">
            <TabsTrigger
              value="events"
              className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground transition"
            >
              Événements
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground transition"
            >
              Membres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Événements à venir</h2>
              <Link href={`/groups/${groupId}/events/new`}>
                <Button size="sm" className="rounded-full bg-primary text-primary-foreground font-semibold">
                  <Plus className="h-4 w-4 text-white mr-1" />
                  <span>Créer</span>
                </Button>
              </Link>
            </div>

            {events.length > 0 ? (
              <div className="space-y-3">
                {events.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <Card className="bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 flex items-center">
                        <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3`}>
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-foreground">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.start_date ? new Date(event.start_date).toLocaleDateString() : "Indéfini"}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-textSecondary" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun événement à venir</p>
                <Button className="mt-4 bg-primary text-primary-foreground rounded-lg font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un événement
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="members" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Membres {members?.length}</h2>
              <Button size="sm" className="rounded-full bg-primary text-primary-foreground font-semibold">
                <Plus className="h-4 w-4 text-white mr-1" />
                <span>Inviter</span>
              </Button>
            </div>

            <div className="space-y-3">
              {members?.map((member) => (
                <Card key={member.id} className="bg-card rounded-xl shadow-md">
                  <CardContent className="p-4 flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.user.full_name
                          .split(" ") 
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-medium text-foreground">{member.user.full_name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5 text-textSecondary" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}
