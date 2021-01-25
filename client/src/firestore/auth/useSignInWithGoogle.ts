import Auth, { GoogleAuthProvider } from "./Auth"
import { useSignIn } from "./useSignIn"

export async function signInWithGoogle() {
  const googleAuthProvider = new GoogleAuthProvider()
  const { user } = await Auth.signInWithPopup(googleAuthProvider)
  return user
}

export function useSignInWithGoogle(isPersistEnabled: boolean) {
  return useSignIn(signInWithGoogle, isPersistEnabled)
}
