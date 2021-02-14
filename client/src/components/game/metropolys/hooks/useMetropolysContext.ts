import { createContext, useContext } from "react"

export type MetropolysContext = {
  resetSelection: () => void
  selectDistrict: (district: number) => void
  selectHeight: (district: number) => void
  selectedDistrict: number | null
  selectedHeight: number | null
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MetropolysContext = createContext<MetropolysContext>({
  resetSelection: () => {
    throw Error("Invalid context")
  },
  selectDistrict: () => {
    throw Error("Invalid context")
  },
  selectHeight: () => {
    throw Error("Invalid context")
  },
  selectedDistrict: null,
  selectedHeight: null,
})

export function useMetropolysContext(): MetropolysContext {
  return useContext(MetropolysContext)
}
