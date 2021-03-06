import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import AsyncButton from "components/ui/AsyncButton"
import { BREADCRUMB_HOME } from "components/ui/Breadcrumb"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignInAnonymous } from "firestore/auth/useSignInAnonymous"
import { useSignInWithGoogle } from "firestore/auth/useSignInWithGoogle"
import { useSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "utils/navigation"

import AuthPersistCheckbox from "./AuthPersistCheckbox"

const DEFAULT_PERSISTENCE = false
const NAVIGATION_PARENTS = [BREADCRUMB_HOME]

const LoginRoute = () => {
  const t = useTranslations()
  const callbackRoute = useSearchParams().get("callback")
  const [isPersistEnabled, setPersistEnabled] = useState(DEFAULT_PERSISTENCE)
  const { isAuthenticated } = useAuthContext()
  const signInAnonymous = useSignInAnonymous(isPersistEnabled)
  const signInWithGoogle = useSignInWithGoogle(isPersistEnabled)
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push(callbackRoute ?? ROUTES.home())
    }
  }, [callbackRoute, history, isAuthenticated])

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title={t.login.pageTitle} />
      <PageContent>
        <div>
          <AsyncButton onClick={signInAnonymous}>
            {t.login.signInAnonymous}
          </AsyncButton>
          <AsyncButton onClick={signInWithGoogle}>
            {t.login.signInWithGoogle}
          </AsyncButton>
        </div>
        <AuthPersistCheckbox
          isPersistEnabled={isPersistEnabled}
          setPersistEnabled={setPersistEnabled}
        />
      </PageContent>
    </PageContainer>
  )
}

export default LoginRoute
