import { FirebaseUser } from "./useAuth"

export type UserInfo = {
  image: string | null
  name: string
}

export type AuthData = {
  isAnonymous: boolean
  isAuthenticated: boolean
  userId: string | null
  userInfo: UserInfo | null
}

export const UNAUTHENTICATED = Object.freeze<AuthData>({
  isAnonymous: false,
  isAuthenticated: false,
  userId: null,
  userInfo: null,
})

export function getAuthData(user: FirebaseUser): AuthData {
  return {
    isAnonymous: user.isAnonymous,
    isAuthenticated: true,
    userId: user.uid,
    userInfo: {
      image: user.photoURL,
      name: user.displayName ?? "Anonymous",
    },
  }
}
