"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  Camera,
  Users,
  Plus,
  X,
  Check,
  ArrowRight,
  Share2,
  ImageIcon,
  Settings,
  Home,
  Music,
  Book,
  Coffee,
  Heart,
  Star,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

// Interface pour les contacts/participants
interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  selected: boolean
}

// Interface pour les icônes disponibles
interface GroupIcon {
  id: string
  name: string
  icon: React.ReactNode
}

// Interface pour les couleurs de thème
interface ThemeColor {
  id: string
  name: string
  value: string
  textColor: string
}

// Interface pour les données du formulaire
interface SubGroupFormData {
  name: string
  description: string
  image: string | null
  inheritTheme: boolean
  themeColor: string
  icon: string
  backgroundImage: string | null
  members: string[]
}

// Interface pour les données du groupe parent
interface ParentGroup {
  id: string
  name: string
  themeColor: string
  icon: string
  backgroundImage: string | null
}

export default function NewSubGroupPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // Simuler les données du groupe parent
  const [parentGroup] = useState<ParentGroup>({
    id: params.id,
    name: "Amis du lycée",
    themeColor: "pink",
    icon: "users",
    backgroundImage: null,
  })

  // État initial du formulaire
  const [formData, setFormData] = useState<SubGroupFormData>({
    name: "",
    description: "",
    image: null,
    inheritTheme: true,
    themeColor: parentGroup.themeColor,
    icon: parentGroup.icon,
    backgroundImage: parentGroup.backgroundImage,
    members: [],
  })

  // Liste des icônes disponibles
  const groupIcons: GroupIcon[] = [
    { id: "users", name: "Utilisateurs", icon: <Users className="h-6 w-6" /> },
    { id: "home", name: "Maison", icon: <Home className="h-6 w-6" /> },
    { id: "music", name: "Musique", icon: <Music className="h-6 w-6" /> },
    { id: "book", name: "Livre", icon: <Book className="h-6 w-6" /> },
    { id: "coffee", name: "Café", icon: <Coffee className="h-6 w-6" /> },
    { id: "heart", name: "Cœur", icon: <Heart className="h-6 w-6" /> },
    { id: "star", name: "Étoile", icon: <Star className="h-6 w-6" /> },
    { id: "zap", name: "Éclair", icon: <Zap className="h-6 w-6" /> },
    { id: "settings", name: "Paramètres", icon: <Settings className="h-6 w-6" /> },
  ]

  // Liste des couleurs de thème
  const themeColors: ThemeColor[] = [
    { id: "pink", name: "Rose", value: "bg-pink-500", textColor: "text-white" },
    { id: "blue", name: "Bleu", value: "bg-blue-500", textColor: "text-white" },
    { id: "green", name: "Vert", value: "bg-green-500", textColor: "text-white" },
    { id: "purple", name: "Violet", value: "bg-purple-500", textColor: "text-white" },
    { id: "orange", name: "Orange", value: "bg-orange-500", textColor: "text-white" },
    { id: "red", name: "Rouge", value: "bg-red-500", textColor: "text-white" },
    { id: "yellow", name: "Jaune", value: "bg-yellow-500", textColor: "text-black" },
    { id: "teal", name: "Turquoise", value: "bg-teal-500", textColor: "text-white" },
  ]

  // Liste fictive de contacts (membres du groupe parent)
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alice Martin",
      email: "alice@example.com",
      phone: "+33 6 12 34 56 78",
      avatar: "/placeholder.svg?height=40&width=40",
      selected: false,
    },
    {
      id: "2",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+33 6 23 45 67 89",
      avatar: "/placeholder.svg?height=40&width=40",
      selected: false,
    },
    {
      id: "3",
      name: "Charlie Dupont",
      email: "charlie@example.com",
      phone: "+33 6 34 56 78 90",
      avatar: "/placeholder.svg?height=40&width=40",
      selected: false,
    },
    {
      id: "4",
      name: "David Smith",
      email: "david@example.com",
      phone: "+33 6 45 67 89 01",
      avatar: "/placeholder.svg?height=40&width=40",
      selected: false,
    },
    {
      id: "5",
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+33 6 56 78 90 12",
      avatar: "/placeholder.svg?height=40&width=40",
      selected: false,
    },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mettre à jour le thème lorsque inheritTheme change
  useEffect(() => {
    if (formData.inheritTheme) {
      setFormData((prev) => ({
        ...prev,
        themeColor: parentGroup.themeColor,
        icon: parentGroup.icon,
        backgroundImage: parentGroup.backgroundImage,
      }))
    }
  }, [formData.inheritTheme, parentGroup])

  // Gérer la sélection/désélection d'un contact
  const toggleContact = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, selected: !contact.selected } : contact)),
    )

    setFormData((prev) => {
      const members = prev.members.includes(contactId)
        ? prev.members.filter((id) => id !== contactId)
        : [...prev.members, contactId]
      return { ...prev, members }
    })
  }

  // Gérer le téléchargement d'une image de groupe
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
    }
  }

  // Gérer le téléchargement d'une image de fond
  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, backgroundImage: imageUrl }))
    }
  }

  // Passer à l'étape suivante
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Revenir à l'étape précédente
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Valider l'étape actuelle
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.name
      case 2:
        return formData.inheritTheme || (!!formData.themeColor && !!formData.icon)
      default:
        return true
    }
  }

  // Obtenir l'icône sélectionnée
  const getSelectedIcon = () => {
    const selectedIcon = groupIcons.find((icon) => icon.id === formData.icon)
    return selectedIcon ? selectedIcon.icon : <Users className="h-6 w-6" />
  }

  // Obtenir la couleur de thème sélectionnée
  const getSelectedColor = () => {
    const selectedColor = themeColors.find((color) => color.id === formData.themeColor)
    return selectedColor ? selectedColor.value : "bg-pink-500"
  }

  // Obtenir la couleur de texte pour la couleur de thème sélectionnée
  const getSelectedTextColor = () => {
    const selectedColor = themeColors.find((color) => color.id === formData.themeColor)
    return selectedColor ? selectedColor.textColor : "text-white"
  }

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler une requête API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)

    toast({
      title: "Sous-groupe créé avec succès",
      description: "Votre sous-groupe a été créé et est prêt à être utilisé.",
    })

    // Rediriger vers la page du groupe parent
    router.push(`/groups/${params.id}`)
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
          <h1 className="text-2xl font-bold text-white font-fredoka">Nouveau sous-groupe</h1>
          <div className="w-6 h-6"></div> {/* Spacer pour l'alignement */}
        </div>

        <div className="wireframe-card p-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">Groupe parent: {parentGroup.name}</h3>
              <p className="text-sm text-white/60">Créer un sous-groupe dans {parentGroup.name}</p>
            </div>
          </div>
        </div>

        {/* Indicateur de progression */}
        <div className="mb-6">
          <Progress
            value={(currentStep / totalSteps) * 100}
            className="h-2 bg-white/20"
            indicatorClassName="bg-white"
          />
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span>Définition</span>
            <span>Thème</span>
            <span>Membres</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Étape 1: Définition du sous-groupe */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      {formData.image ? (
                        <img
                          src={formData.image || "/placeholder.svg"}
                          alt="Group"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <label
                      htmlFor="group-image"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        id="group-image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group-name" className="text-white mb-2 block">
                      Nom du sous-groupe
                    </Label>
                    <Input
                      id="group-name"
                      placeholder="Ex: Classe de Terminale"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="wireframe-input"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="group-description" className="text-white mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="group-description"
                      placeholder="Ex: Sous-groupe pour les anciens de la Terminale S2"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="wireframe-input resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="button"
                    className="w-full wireframe-button"
                    onClick={goToNextStep}
                    disabled={!validateCurrentStep()}
                  >
                    Continuer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Étape 2: Personnalisation du thème */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="wireframe-card p-4">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full ${getSelectedColor()} flex items-center justify-center mr-3`}
                    >
                      {getSelectedIcon()}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{formData.name}</h3>
                      <p className="text-sm text-white/60">Personnalisez l'apparence de votre sous-groupe</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Option pour hériter du thème du groupe parent */}
                  <div className="flex items-center justify-between p-4 wireframe-card">
                    <Label htmlFor="inherit-theme" className="flex items-center gap-3 cursor-pointer">
                      <Share2 className="w-5 h-5 text-white/60" />
                      <div>
                        <span className="text-white">Hériter du thème du groupe parent</span>
                        <p className="text-xs text-white/60">
                          Utiliser les mêmes couleurs et icônes que {parentGroup.name}
                        </p>
                      </div>
                    </Label>
                    <Switch
                      id="inherit-theme"
                      checked={formData.inheritTheme}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, inheritTheme: checked }))}
                      className="data-[state=checked]:bg-white"
                    />
                  </div>

                  {/* Personnalisation du thème si l'héritage est désactivé */}
                  {!formData.inheritTheme && (
                    <>
                      {/* Choix de la couleur de thème */}
                      <div>
                        <Label className="text-white mb-2 block">Couleur du thème</Label>
                        <div className="grid grid-cols-4 gap-3">
                          {themeColors.map((color) => (
                            <button
                              key={color.id}
                              type="button"
                              className={`h-12 rounded-lg ${color.value} flex items-center justify-center ${
                                formData.themeColor === color.id ? "ring-2 ring-white" : ""
                              }`}
                              onClick={() => setFormData((prev) => ({ ...prev, themeColor: color.id }))}
                            >
                              {formData.themeColor === color.id && <Check className={`h-6 w-6 ${color.textColor}`} />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Choix de l'icône */}
                      <div>
                        <Label className="text-white mb-2 block">Icône du sous-groupe</Label>
                        <RadioGroup
                          value={formData.icon}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, icon: value }))}
                          className="grid grid-cols-3 gap-3"
                        >
                          {groupIcons.map((icon) => (
                            <div key={icon.id}>
                              <RadioGroupItem value={icon.id} id={`icon-${icon.id}`} className="sr-only" />
                              <Label
                                htmlFor={`icon-${icon.id}`}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg wireframe-card cursor-pointer ${
                                  formData.icon === icon.id ? "bg-white/30" : ""
                                }`}
                              >
                                <div className="mb-2 text-white">{icon.icon}</div>
                                <span className="text-xs text-white">{icon.name}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Choix de l'image de fond */}
                      <div>
                        <Label className="text-white mb-2 block">Image de fond (optionnelle)</Label>
                        <div className="relative">
                          <div className="h-32 rounded-lg bg-white/20 flex items-center justify-center overflow-hidden">
                            {formData.backgroundImage ? (
                              <img
                                src={formData.backgroundImage || "/placeholder.svg"}
                                alt="Background"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-12 h-12 text-white/60" />
                            )}
                          </div>
                          <label
                            htmlFor="background-image"
                            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                          >
                            <Camera className="w-4 h-4 text-white" />
                            <input
                              type="file"
                              id="background-image"
                              accept="image/*"
                              className="hidden"
                              onChange={handleBackgroundImageUpload}
                            />
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 wireframe-button"
                    onClick={goToPreviousStep}
                  >
                    Retour
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 wireframe-button"
                    onClick={goToNextStep}
                    disabled={!validateCurrentStep()}
                  >
                    Continuer
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Étape 3: Invitation des membres */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <Label className="text-white mb-2 block">Membres ({formData.members.length} sélectionnés)</Label>
                  <p className="text-sm text-white/60 mb-4">
                    Sélectionnez les membres du groupe parent qui feront partie de ce sous-groupe.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {contacts
                      .filter((contact) => contact.selected)
                      .map((contact) => (
                        <div key={contact.id} className="flex items-center bg-white/20 rounded-full pl-1 pr-2 py-1">
                          <Avatar className="w-6 h-6 mr-1">
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-white/30 text-white text-xs">
                              {contact.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-white mr-1">{contact.name.split(" ")[0]}</span>
                          <button
                            type="button"
                            onClick={() => toggleContact(contact.id)}
                            className="text-white/60 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                  </div>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full wireframe-button flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter des membres
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="wireframe-gradient border-white/20">
                      <SheetHeader>
                        <SheetTitle className="text-white">Sélectionner des membres</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        {contacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="flex items-center justify-between p-3 wireframe-card"
                            onClick={() => toggleContact(contact.id)}
                          >
                            <div className="flex items-center">
                              <Avatar className="w-10 h-10 mr-3">
                                <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-white/20 text-white">
                                  {contact.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-white">{contact.name}</p>
                                <p className="text-sm text-white/60">{contact.phone || contact.email}</p>
                              </div>
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                contact.selected ? "bg-white" : "border-2 border-white/60"
                              }`}
                            >
                              {contact.selected && <Check className="w-4 h-4 text-primary-500" />}
                            </div>
                          </div>
                        ))}
                        <SheetClose asChild>
                          <Button className="w-full wireframe-button mt-4">
                            Confirmer ({formData.members.length})
                          </Button>
                        </SheetClose>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 wireframe-button"
                    onClick={goToPreviousStep}
                  >
                    Retour
                  </Button>
                  <Button type="submit" className="flex-1 wireframe-button" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Création...
                      </>
                    ) : (
                      "Créer le sous-groupe"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}
