import { useCallback } from "react"
import { getDefaultAuthPersistence } from "./AuthPersistence"
import Auth, { FirebaseUserCredential } from "./Auth"

export function useSignInAnonymous(): () => Promise<FirebaseUserCredential> {
  return useCallback(async () => {
    await Auth.setPersistence(getDefaultAuthPersistence())
    const userCredential = await Auth.signInAnonymously()
    return userCredential
  }, [])
}
