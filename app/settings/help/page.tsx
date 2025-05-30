"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, HelpCircle, MessageSquare, FileText, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  return (
    <div>
      {/* Header sticky moderne */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-5">
          <Link href="/settings" className="rounded-full bg-primary/10 hover:bg-primary/20 p-2 transition shadow" aria-label="Retour">
            <ChevronLeft className="w-6 h-6 text-primary" />
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-fredoka flex-1">Aide et support</h1>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-md mx-auto px-4 py-8 space-y-8">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground/80">Comment pouvons-nous vous aider ?</h2>

          
            <Card className="rounded-xl shadow-md hover:scale-105 transition">
                <CardContent className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                  <h3 className="font-medium text-foreground">Questions fréquentes</h3>
                  <p className="text-sm text-muted-foreground">Trouvez rapidement des réponses à vos questions</p>
                  </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                </CardContent>
              </Card>
       


              <Card className="rounded-xl shadow-md hover:scale-105 transition">
                <CardContent className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                  <h3 className="font-medium text-foreground">Contacter le support</h3>
                  <p className="text-sm text-muted-foreground">Discutez avec notre équipe d'assistance</p>
                  </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                </CardContent>
              </Card>
    


            <Card className="rounded-xl shadow-md hover:scale-105 transition">
                <CardContent className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                  <h3 className="font-medium text-foreground">Conditions d'utilisation</h3>
                  <p className="text-sm text-muted-foreground">Consultez nos conditions d'utilisation</p>
                  </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                </CardContent>
              </Card>

          </div>

          <div className="pt-4 space-y-4">
          <p className="text-center text-muted-foreground">Vous ne trouvez pas ce que vous cherchez ?</p>
          <Button className="w-full rounded-full py-3 font-semibold flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition">
            <Mail className="w-5 h-5" />
              Nous envoyer un email
            </Button>
          </div>
        </motion.div>
    </div>
  )
}
