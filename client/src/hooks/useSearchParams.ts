import { useLocation } from "react-router-dom"

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(useLocation().search)
}
