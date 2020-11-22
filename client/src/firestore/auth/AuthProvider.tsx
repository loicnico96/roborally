import React, { useEffect, useState } from "react"
import { getAuthData, UNAUTHENTICATED } from "./AuthData"
import { AuthContextProvider } from "./AuthContext"
import { useAuth } from "./useAuth"

export type AuthProviderProps = React.PropsWithChildren<{
  // TODO
}>

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth()

  const [authData, setAuthData] = useState(UNAUTHENTICATED)

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(user => {
      if (user !== null) {
        setAuthData(getAuthData(user))
      } else {
        setAuthData(UNAUTHENTICATED)
      }
    })

    return subscription
  }, [auth, setAuthData])

  return <AuthContextProvider value={authData}>{children}</AuthContextProvider>
}

export default AuthProvider
