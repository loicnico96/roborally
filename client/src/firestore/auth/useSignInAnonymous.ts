import { useCallback } from "react"
import { AuthPersistence, FirebaseUserCredential, useAuth } from "./useAuth"

export function useSignInAnonymous(): () => Promise<FirebaseUserCredential> {
  const auth = useAuth()
  return useCallback(async () => {
    await auth.setPersistence(AuthPersistence.SESSION)
    const userCredential = await auth.signInAnonymously()
    return userCredential
  }, [auth])
}
