import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignInAnonymous } from "firestore/auth/useSignInAnonymous"
import { useSearchParams } from "hooks/useSearchParams"
import { useTrans } from "hooks/useTrans"
import { ROUTES } from "utils/navigation"

import PageHeader from "./PageHeader"
import AsyncButton from "./primitives/AsyncButton"

const LoginRoute = () => {
  const t = useTrans("LoginPage")
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
      <PageHeader title={t("pageTitle")} />
      {isAuthenticated && userId !== null && userInfo !== null ? (
        <div>{t("signedIn", { username: userInfo.name })}</div>
      ) : (
        <AsyncButton onClick={signInAnonymous}>
          {t("signInAnonymous")}
        </AsyncButton>
      )}
    </div>
  )
}

export default LoginRoute
