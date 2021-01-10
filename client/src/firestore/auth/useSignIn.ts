import { useCallback } from "react"

import { useActions } from "hooks/useActions"

import Auth, { FirebaseUser } from "./Auth"
import { getDefaultAuthPersistence } from "./AuthPersistence"

export function useSignIn(
  signInHandler: () => Promise<FirebaseUser | null>
): () => Promise<void> {
  const { setCurrentUser } = useActions()

  return useCallback(async () => {
    await Auth.setPersistence(getDefaultAuthPersistence())
    const user = await signInHandler()
    setCurrentUser(user)
  }, [setCurrentUser, signInHandler])
}
