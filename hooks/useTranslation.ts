"use client"

import { useCallback } from "react"
import { t as translateFunc, hasTranslation } from "../lib/translation-utils"

export function useTranslation() {
  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    return translateFunc(key, params)
  }, [])

  const exists = useCallback((key: string) => {
    return hasTranslation(key)
  }, [])

  return { t, exists }
}
