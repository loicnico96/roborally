import React, { ReactNode, useEffect } from "react"

import { useActions } from "hooks/useActions"

import Auth from "./Auth"

export type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setCurrentUser } = useActions()

  useEffect(() => Auth.onAuthStateChanged(setCurrentUser), [setCurrentUser])

  return <>{children}</>
}

export default AuthProvider
