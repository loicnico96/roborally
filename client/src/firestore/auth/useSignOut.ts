import { useCallback } from "react"
import Auth from "./Auth"

export function useSignOut(): () => Promise<void> {
  return useCallback(async () => {
    await Auth.signOut()
  }, [])
}
