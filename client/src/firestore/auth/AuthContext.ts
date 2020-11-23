import { UserId, UserInfo } from "common/model/UserInfo"
import { createContext, useContext } from "react"

export type AuthUser = UserInfo & {
  updateName: (name: string) => Promise<void>
}

export type AuthData = {
  isAnonymous: boolean
  isAuthenticated: boolean
  userId: UserId | null
  userInfo: AuthUser | null
}

export const UNAUTHENTICATED = Object.freeze<AuthData>({
  isAnonymous: false,
  isAuthenticated: false,
  userId: null,
  userInfo: null,
})

export const AuthContext = createContext<AuthData>(UNAUTHENTICATED)

export const AuthContextProvider = AuthContext.Provider

export function useAuthContext(): AuthData {
  return useContext(AuthContext)
}
