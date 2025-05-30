"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Erreur capturée par ErrorBoundary:", error)
      setHasError(true)
      setError(error.error)
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oups, quelque chose s'est mal passé</h2>
        <p className="mb-6 text-foreground-600">
          Nous sommes désolés pour ce problème. Veuillez réessayer ou contacter le support si le problème persiste.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => {
              setHasError(false)
              setError(null)
            }}
          >
            Réessayer
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/"
            }}
          >
            Retour à l'accueil
          </Button>
        </div>
        {process.env.NODE_ENV !== "production" && error && (
          <div className="mt-8 p-4 bg-red-50 rounded-md text-left">
            <p className="font-mono text-sm text-red-800">{error.toString()}</p>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}
