import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignInAnonymous } from "firestore/auth/useSignInAnonymous"
import { useSearchParams } from "hooks/useSearchParams"
import { ROUTES } from "utils/navigation"

import PageHeader from "./PageHeader"
import AsyncButton from "./primitives/AsyncButton"

const LoginRoute = () => {
  const callbackRoute = useSearchParams().get("callback")
  const { isAuthenticated, userId, userInfo } = useAuthContext()
  const signInAnonymous = useSignInAnonymous()
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push(callbackRoute ?? ROUTES.home())
    }
  }, [callbackRoute, history, isAuthenticated])

  return (
    <div>
      <PageHeader title="Sign-in" />
      {isAuthenticated && userId !== null && userInfo !== null ? (
        <div>
          Signed in as {userId} : {JSON.stringify(userInfo)}
        </div>
      ) : (
        <AsyncButton onClick={signInAnonymous}>Sign in as guest</AsyncButton>
      )}
    </div>
  )
}

export default LoginRoute
