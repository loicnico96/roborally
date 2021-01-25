import Auth from "./Auth"
import { promptUserName } from "./promptUserName"
import { useSignIn } from "./useSignIn"

export async function signInAnonymous() {
  const displayName = promptUserName()
  const { user } = await Auth.signInAnonymously()

  if (user !== null) {
    await user.updateProfile({ displayName })
  }

  return user
}

export function useSignInAnonymous(isPersistEnabled: boolean) {
  return useSignIn(signInAnonymous, isPersistEnabled)
}
