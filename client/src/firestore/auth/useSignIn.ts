import { useCallback } from "react"

import { useActions } from "hooks/useActions"

import Auth, { FirebaseUser } from "./Auth"

export enum AuthPersistence {
  LOCAL = "local",
  SESSION = "session",
}

export function useSignIn(
  signInHandler: () => Promise<FirebaseUser | null>,
  isPersistEnabled: boolean
): () => Promise<void> {
  const { setCurrentUser } = useActions()

  return useCallback(async () => {
    const persistence = isPersistEnabled
      ? AuthPersistence.LOCAL
      : AuthPersistence.SESSION
    await Auth.setPersistence(persistence)
    const user = await signInHandler()
    setCurrentUser(user)
  }, [isPersistEnabled, setCurrentUser, signInHandler])
}
