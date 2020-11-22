import React, { useEffect } from "react"
import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignInAnonymous } from "firestore/auth/useSignInAnonymous"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import PageHeader from "./PageHeader"
import { useHistory } from "react-router-dom"
import { ROUTES } from "utils/navigation"
import { useSearchParams } from "hooks/useSearchParams"

const LoginRoute = () => {
  const callbackRoute = useSearchParams().get("callback")
  const { isAuthenticated, userId, userInfo } = useAuthContext()
  const [signInAnonymous, isLoading] = useAsyncHandler(useSignInAnonymous())
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
        <button onClick={signInAnonymous} disabled={isLoading}>
          Sign in as guest
        </button>
      )}
    </div>
  )
}

export default LoginRoute
