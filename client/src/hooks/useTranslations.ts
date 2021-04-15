import { useContext } from "react"

import { TranslationContext } from "components/ui/TranslationProvider"

export type { TranslationConfig } from "config/translations/types"

export function useTranslations() {
  return useContext(TranslationContext)
}
