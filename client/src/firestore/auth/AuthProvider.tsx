import update from "immutability-helper"
import React, { useEffect, useState } from "react"
import { UNAUTHENTICATED } from "./AuthData"
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
        setAuthData({
          isAnonymous: user.isAnonymous,
          isAuthenticated: true,
          userId: user.uid,
          userInfo: {
            image: user.photoURL,
            name: user.displayName ?? "Anonymous",
            updateName: async (name: string) => {
              await user.updateProfile({ displayName: name })
              setAuthData(data =>
                update(data, {
                  userInfo: {
                    $merge: {
                      name,
                    },
                  },
                })
              )
            },
          },
        })
      } else {
        setAuthData(UNAUTHENTICATED)
      }
    })

    return subscription
  }, [auth, setAuthData])

  return <AuthContextProvider value={authData}>{children}</AuthContextProvider>
}

export default AuthProvider
