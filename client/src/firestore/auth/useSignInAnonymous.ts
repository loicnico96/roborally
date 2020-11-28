import { useCallback } from "react"

import Auth, { FirebaseUserCredential } from "./Auth"
import { getDefaultAuthPersistence } from "./AuthPersistence"

export function useSignInAnonymous(): () => Promise<FirebaseUserCredential> {
  return useCallback(async () => {
    await Auth.setPersistence(getDefaultAuthPersistence())
    const userCredential = await Auth.signInAnonymously()
    return userCredential
  }, [])
}
