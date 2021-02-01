import React, { useState } from "react"

import { MetropolysContext } from "./hooks/useMetropolysContext"

export type ProviderProps = React.PropsWithChildren<{
  // Nothing for now
}>

const MetropolysContextProvider = ({ children }: ProviderProps) => {
  const [selectedDistrict, selectDistrict] = useState<number | null>(null)
  const [selectedHeight, selectHeight] = useState<number | null>(null)

  const context: MetropolysContext = {
    selectDistrict,
    selectHeight,
    selectedDistrict,
    selectedHeight,
  }

  return (
    <MetropolysContext.Provider value={context}>
      {children}
    </MetropolysContext.Provider>
  )
}

export default MetropolysContextProvider
