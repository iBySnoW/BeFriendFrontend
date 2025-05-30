"use client"

import type React from "react"
import { t } from "../lib/translation-utils"

interface TranslatedTextProps {
  id: string
  params?: Record<string, string | number>
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({ id, params, className = "", tag: Tag = "span" }) => {
  const translatedText = t(id, params)

  return <Tag className={className}>{translatedText}</Tag>
}

// Composant HOC pour envelopper des composants avec des traductions
export function withTranslation<P extends object>(Component: React.ComponentType<P & { t: typeof t }>) {
  return function WrappedComponent(props: P) {
    return <Component {...props} t={t} />
  }
}
