import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Clock, UserCircle, Image } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon } from "lucide-react"
import { eventApi } from "@/lib/api/event"
import { CreateEventDto, Event } from "@/types/event"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X } from "lucide-react"

interface EventFormProps {
  groupId?: string
  onSuccess?: () => void
}

// Interface pour stocker la date et l'heure
interface DateTimeRange {
  from: {
    date: Date
    time: string
  }
  to?: {
    date: Date
    time: string
  }
}

// Simuler des suggestions de participants (à remplacer par une vraie API plus tard)
const groupMembers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diane" },
]

export function EventForm({ groupId, onSuccess }: EventFormProps) {
  const router = useRouter()
  // Champs principaux
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateTimeRange, setDateTimeRange] = useState<DateTimeRange | undefined>(undefined)
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [participants, setParticipants] = useState<{ id: number; name: string }[]>([])
  const [participantInput, setParticipantInput] = useState("")
  const [showDateToBeDefined, setShowDateToBeDefined] = useState(false)
  const [touched, setTouched] = useState<{ title?: boolean; date?: boolean; participants?: boolean }>({})

  // Fonction pour mettre à jour la plage de dates avec les heures
  const handleDateSelect = (range: DateRange | undefined) => {
    if (!range || !range.from) {
      setDateTimeRange(undefined)
      return
    }

    setDateTimeRange({
      from: {
        date: range.from,
        time: "12:00" // Heure par défaut
      },
      to: range.to ? {
        date: range.to,
        time: "23:59" // Heure par défaut pour la fin
      } : undefined
    })
  }

  // Fonction pour mettre à jour l'heure
  const handleTimeChange = (type: 'from' | 'to', time: string) => {
    if (!dateTimeRange) return

    setDateTimeRange(prev => {
      if (!prev) return prev
      if (type === 'from') {
        return {
          ...prev,
          from: { ...prev.from, time }
        }
      } else {
        return {
          ...prev,
          to: prev.to ? { ...prev.to, time } : undefined
        }
      }
    })
  }

  // Gestion de l'ajout de participants
  const handleAddParticipant = (member: { id: number; name: string }) => {
    if (!participants.find(p => p.id === member.id)) {
      setParticipants([...participants, member])
    }
    setParticipantInput("")
  }

  const handleRemoveParticipant = (id: number) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  // Soumission finale
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ title: true, date: true, participants: true })
    setLoading(true)
    setError(null)
   
    try {
      if (!title.trim()) throw new Error("Le titre est requis")
      if (!showDateToBeDefined && !dateTimeRange?.from.date) throw new Error("La date de début est requise")
      if (participants.length === 0) throw new Error("Au moins un participant est requis")
      if (!groupId) throw new Error("L'ID du groupe est requis")

      const payload: CreateEventDto = {
        title,
        description: description || undefined,
        location: location || undefined,
        start_date: dateTimeRange.from.date,
        end_date: dateTimeRange.to?.date,
        group_id: Number(groupId),
      }

      const response = await eventApi.createEvent(payload) as Event

      toast.success("Événement créé avec succès")

      if (response?.id) {
        router.push(`/events/${response.id}`)
      } else {
        throw new Error("Erreur lors de la création de l'événement : ID manquant")
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la création de l'événement")
      console.error("Erreur lors de la création de l'événement:", err)
      toast.error(err instanceof Error ? err.message : "Erreur lors de la création de l'événement")
    } finally {
      setLoading(false)
    }
  }

  // Fonction interne pour rendre les inputs d'heure
  function renderTimeInputs(dateTimeRange: DateTimeRange) {
    return (
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2">
          <Label className="text-sm text-card-foreground">Heure de début</Label>
          <Input type="time" value={dateTimeRange.from.time} onChange={e => handleTimeChange('from', e.target.value)} className="w-28 bg-background border border-neutral-200 text-foreground" />
        </div>
        {dateTimeRange.to && (
          <div className="flex items-center gap-2">
            <Label className="text-sm text-card-foreground">Heure de fin</Label>
            <Input type="time" value={dateTimeRange.to.time} onChange={e => handleTimeChange('to', e.target.value)} className="w-28 bg-background border border-neutral-200 text-foreground" />
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-8">
      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}
      
      {/* Bloc principal : titre, date/heure, lieu, organisateur */}
      <div className="flex flex-col gap-6">
        {/* Titre de l'événement */}
        <div className="rounded-2xl bg-card shadow-lg p-6 flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-primary" />
          <div className="flex-1">
            <Label htmlFor="title" className="text-base font-semibold text-card-foreground">Titre de l'événement</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              onBlur={() => setTouched(t => ({ ...t, title: true }))}
              placeholder="Ex: Anniversaire, Dîner..." 
              required 
              className="mt-1 bg-background border border-neutral-200 rounded-lg text-base text-foreground focus:border-primary focus:ring-primary" 
              aria-invalid={touched.title && !title.trim()}
            />
            {touched.title && !title.trim() && <div className="text-destructive text-xs mt-1">Le titre est requis</div>}
          </div>
        </div>
        {/* Date/heure */}
        <div className="rounded-2xl bg-card shadow-lg p-6 flex items-start gap-3">
          <Clock className="w-6 h-6 text-primary mt-2" />
          <div className="flex-1">
            <Label className="text-base font-semibold text-card-foreground">Date & heure</Label>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Button type="button" variant={showDateToBeDefined ? "default" : "outline"} className="rounded-full px-4 py-1 text-xs" onClick={() => setShowDateToBeDefined(v => !v)}>
                  {showDateToBeDefined ? "Date à définir avec le groupe" : "À définir avec le groupe"}
                </Button>
                {!showDateToBeDefined && touched.date && !dateTimeRange?.from.date && <span className="text-destructive text-xs ml-2">Date requise</span>}
              </div>
              {!showDateToBeDefined && (
                <div className="rounded-xl overflow-hidden shadow-md border border-neutral-200 bg-background p-2">
                  <Calendar
                    mode="range"
                    selected={dateTimeRange ? {
                      from: dateTimeRange.from.date,
                      to: dateTimeRange.to?.date
                    } : undefined}
                    onSelect={handleDateSelect}
                    className="!bg-background !border-none !rounded-xl !p-0"
                    classNames={{
                      months: "flex flex-col sm:flex-row gap-4",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-base font-semibold text-primary",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 text-primary",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs",
                      row: "flex w-full mt-2",
                      cell: "h-9 w-9 text-center text-sm p-0 relative",
                      day: "h-9 w-9 p-0 font-normal rounded-full hover:bg-primary/10 focus:bg-primary/20 transition aria-selected:bg-primary aria-selected:text-primary-foreground",
                      day_selected: "bg-primary text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "bg-primary/10",
                      day_hidden: "invisible",
                    }}
                  />
                  {dateTimeRange ? renderTimeInputs(dateTimeRange) : null}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Lieu */}
        <div className="rounded-2xl bg-card shadow-lg p-6 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-primary" />
          <div className="flex-1">
            <Label htmlFor="location" className="text-base font-semibold text-card-foreground">Lieu</Label>
            <Input id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Adresse, lieu..." className="mt-1 bg-background border border-neutral-200 rounded-lg text-base text-foreground focus:border-primary focus:ring-primary" />
          </div>
        </div>
        {/* Participants */}
        <div className="rounded-2xl bg-card shadow-lg p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <UserCircle className="w-6 h-6 text-primary" />
            <Label className="text-base font-semibold text-card-foreground">Participants</Label>
            {touched.participants && participants.length === 0 && <span className="text-destructive text-xs ml-2">Au moins un participant</span>}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {participants.map(p => (
              <span key={p.id} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Avatar className="w-5 h-5"><AvatarFallback>{p.name[0]}</AvatarFallback></Avatar>
                {p.name}
                <button type="button" onClick={() => handleRemoveParticipant(p.id)} aria-label={`Retirer ${p.name}`} className="ml-1"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Ajouter un participant..."
            value={participantInput}
            onChange={e => setParticipantInput(e.target.value)}
            onFocus={() => setTouched(t => ({ ...t, participants: true }))}
            className="mt-2 bg-background border border-neutral-200 rounded-lg text-base text-foreground focus:border-primary focus:ring-primary"
            aria-label="Ajouter un participant"
          />
          {/* Suggestions */}
          {participantInput && (
            <div className="flex flex-wrap gap-2 mt-2">
              {groupMembers.filter(m => m.name.toLowerCase().includes(participantInput.toLowerCase()) && !participants.find(p => p.id === m.id)).map(m => (
                <button type="button" key={m.id} onClick={() => handleAddParticipant(m)} className="bg-muted px-3 py-1 rounded-full text-sm hover:bg-primary/10 transition">
                  <Avatar className="w-5 h-5 inline-block mr-1"><AvatarFallback>{m.name[0]}</AvatarFallback></Avatar>{m.name}
                </button>
              ))}
              {groupMembers.filter(m => m.name.toLowerCase().includes(participantInput.toLowerCase()) && !participants.find(p => p.id === m.id)).length === 0 && <span className="text-muted-foreground text-xs">Aucun résultat</span>}
            </div>
          )}
          {/* Suggestion rapide */}
          {participants.length === 0 && (
            <div className="mt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setParticipants(groupMembers)}>Inviter tous les membres du groupe</Button>
            </div>
          )}
        </div>
        {/* Organisateur */}
        <div className="rounded-2xl bg-card shadow-lg p-6 flex items-center gap-3">
          <UserCircle className="w-6 h-6 text-primary" />
          <div className="flex-1">
            <Label className="text-base font-semibold text-card-foreground">Organisé par</Label>
            <div className="mt-1 text-base font-medium text-card-foreground">Vous</div>
          </div>
        </div>
      </div>

      {/* Blocs optionnels */}
      <div className="flex flex-col gap-4 mt-6">
        {/* Album photo partagé */}
        <div className="rounded-2xl bg-card shadow-lg p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            <span className="text-base font-semibold text-card-foreground">Album photo partagé</span>
          </div>
          <span className="text-sm text-muted-foreground">Créez un album photo pour cet événement et partagez-le avec les participants.</span>
          <Button variant="secondary" className="w-fit rounded-full mt-1">Créer un album</Button>
        </div>
      </div>

      {/* Suggestions intelligentes */}
      <div className="flex flex-col gap-2 mt-6">
        <div className="rounded-2xl bg-accent/40 p-4 text-sm text-accent-foreground">
          <div className="font-semibold mb-1">Suggestions</div>
          <ul className="list-disc ml-5 space-y-1">
            <li>Proposer plusieurs dates pour un sondage</li>
            <li>Ajouter une cagnotte pour l'événement</li>
            <li>Créer un album photo partagé</li>
          </ul>
        </div>
      </div>

      {/* Récapitulatif avant validation */}
      <div className="rounded-2xl bg-muted/30 p-4 mt-6">
        <div className="font-semibold mb-2">Récapitulatif</div>
        <div><span className="font-medium">Titre :</span> {title || <span className="text-muted-foreground">(non renseigné)</span>}</div>
        <div><span className="font-medium">Date :</span> {showDateToBeDefined ? <span className="text-muted-foreground">À définir</span> : dateTimeRange?.from.date?.toLocaleDateString() || <span className="text-muted-foreground">(non renseignée)</span>}</div>
        <div><span className="font-medium">Lieu :</span> {location || <span className="text-muted-foreground">(non renseigné)</span>}</div>
        <div><span className="font-medium">Participants :</span> {participants.length > 0 ? participants.map(p => p.name).join(", ") : <span className="text-muted-foreground">(aucun)</span>}</div>
      </div>

      {/* Bouton principal */}
      <div className="flex justify-end mt-8">
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 rounded-full text-lg font-bold bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Création en cours..." : "Créer l'événement"}
        </Button>
      </div>
    </form>
  )
} 