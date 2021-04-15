import React, { ReactNode } from "react"

import CONFIG_EN from "config/translations/en"

export type TranslationProviderProps = {
  children: ReactNode
}

export const TranslationContext = React.createContext(CONFIG_EN)

const TranslationProvider = ({ children }: TranslationProviderProps) => (
  <TranslationContext.Provider value={CONFIG_EN}>
    {children}
  </TranslationContext.Provider>
)

export default TranslationProvider
