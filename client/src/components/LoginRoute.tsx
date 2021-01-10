import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import AsyncButton from "components/ui/AsyncButton"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignInAnonymous } from "firestore/auth/useSignInAnonymous"
import { useSignInWithGoogle } from "firestore/auth/useSignInWithGoogle"
import { useSearchParams } from "hooks/useSearchParams"
import { ROUTES } from "utils/navigation"

const NAVIGATION_PARENTS = [{ title: "HOME", path: ROUTES.home() }]

const LoginRoute = () => {
  const callbackRoute = useSearchParams().get("callback")
  const { isAuthenticated, userId, userInfo } = useAuthContext()
  const signInAnonymous = useSignInAnonymous()
  const signInWithGoogle = useSignInWithGoogle()
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push(callbackRoute ?? ROUTES.home())
    }
  }, [callbackRoute, history, isAuthenticated])

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title="LOGIN" />
      <PageContent>
        {isAuthenticated && userId !== null && userInfo !== null ? (
          <div>
            Signed in as {userId} : {JSON.stringify(userInfo)}
          </div>
        ) : (
          <div>
            <AsyncButton onClick={signInAnonymous}>
              Sign in as guest
            </AsyncButton>
            <AsyncButton onClick={signInWithGoogle}>
              Sign in with Google
            </AsyncButton>
          </div>
        )}
      </PageContent>
    </PageContainer>
  )
}

export default LoginRoute
