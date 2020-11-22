import { useCallback } from "react"
import { FirebaseUserCredential, useAuth } from "./useAuth"

export function useSignInAnonymous(): () => Promise<FirebaseUserCredential> {
  const auth = useAuth()
  return useCallback(async () => auth.signInAnonymously(), [auth])
}
