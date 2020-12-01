import { useMemo } from "react"

import { Key } from "common/utils/objects"
import CONFIG_EN from "config/translations/en"
import {
  getTranslations,
  getTranslationFn,
  TranslationConfig,
  TranslationFn,
  Translations,
} from "utils/translations"

const DEFAULT_CONFIG = CONFIG_EN

export function useTrans<N extends Key<TranslationConfig>>(
  defaultNamespace: N
): TranslationFn<TranslationConfig[N]> & Translations {
  return useMemo(() => {
    const t = getTranslations(DEFAULT_CONFIG)
    const defaultFn = getTranslationFn(t, DEFAULT_CONFIG[defaultNamespace])
    return Object.assign(defaultFn, t)
  }, [defaultNamespace])
}
