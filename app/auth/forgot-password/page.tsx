"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Mail, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler une requête API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)

    toast({
      title: "Email envoyé",
      description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.",
    })
  }

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex-1 flex items-center justify-center p-4 wireframe-gradient"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center">
            <Link href="/auth" className="text-white mr-4">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h2 className="text-3xl font-bold text-white font-fredoka">Mot de passe oublié</h2>
          </div>

          {!isSubmitted ? (
            <>
              <p className="text-white/80">
                Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10 wireframe-input"
                      placeholder="Adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full wireframe-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer le lien de réinitialisation"
                    )}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Email envoyé !</h3>
                <p className="text-white/80">
                  Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. Vérifiez votre boîte de
                  réception et suivez les instructions.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/auth">
                  <Button className="wireframe-button">Retour à la connexion</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
  )
}
