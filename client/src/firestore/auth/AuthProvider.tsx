import update from "immutability-helper"
import React, { useEffect, useState } from "react"

import Auth from "./Auth"
import { AuthContextProvider, UNAUTHENTICATED } from "./AuthContext"

export type AuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useState(UNAUTHENTICATED)

  useEffect(() => {
    const subscription = Auth.onAuthStateChanged(user => {
      if (user !== null) {
        setAuthData({
          isAnonymous: user.isAnonymous,
          isAuthenticated: true,
          userId: user.uid,
          userInfo: {
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
  }, [setAuthData])

  return <AuthContextProvider value={authData}>{children}</AuthContextProvider>
}

export default AuthProvider
