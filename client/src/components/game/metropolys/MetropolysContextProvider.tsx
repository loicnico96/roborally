import React, { useCallback, useState } from "react"

import { MetropolysContext } from "./hooks/useMetropolysContext"

export type ProviderProps = React.PropsWithChildren<{
  // Nothing for now
}>

const MetropolysContextProvider = ({ children }: ProviderProps) => {
  const [selectedDistrict, selectDistrict] = useState<number | null>(null)
  const [selectedHeight, selectHeight] = useState<number | null>(null)

  const resetSelection = useCallback(() => {
    selectDistrict(null)
    selectHeight(null)
  }, [selectDistrict, selectHeight])

  const context: MetropolysContext = {
    resetSelection,
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
