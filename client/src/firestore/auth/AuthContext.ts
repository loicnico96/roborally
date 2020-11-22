import { createContext, useContext } from "react"
import { AuthData, UNAUTHENTICATED } from "./AuthData"

export const AuthContext = createContext<AuthData>(UNAUTHENTICATED)

export const AuthContextProvider = AuthContext.Provider

export function useAuthContext(): AuthData {
  return useContext(AuthContext)
}
