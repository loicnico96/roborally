import { FirebaseUser } from "./useAuth"

export type UserInfo = {
  icon: string | null
  name: string | null
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
      icon: user.photoURL,
      name: user.displayName,
    },
  }
}
