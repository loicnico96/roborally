import { useCallback } from "react"
import { useAuth } from "./useAuth"

export function useSignOut(): () => Promise<void> {
  const auth = useAuth()
  return useCallback(async () => {
    await auth.signOut()
  }, [auth])
}
