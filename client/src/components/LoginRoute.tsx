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

import { BREADCRUMB_HOME } from "./ui/Breadcrumb"

const NAVIGATION_PARENTS = [BREADCRUMB_HOME]

const LoginRoute = () => {
  const callbackRoute = useSearchParams().get("callback")
  const { isAuthenticated } = useAuthContext()
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
      <PageHeader parents={NAVIGATION_PARENTS} title="Login" />
      <PageContent>
        <AsyncButton onClick={signInAnonymous}>Sign in as guest</AsyncButton>
        <AsyncButton onClick={signInWithGoogle}>
          Sign in with Google
        </AsyncButton>
      </PageContent>
    </PageContainer>
  )
}

export default LoginRoute
