import React, { useCallback, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignOut } from "firestore/auth/useSignOut"
import { useTrans } from "hooks/useTrans"
import { ROUTES, withSearchParams } from "utils/navigation"

import AsyncButton from "./primitives/AsyncButton"

type PageHeaderProps = {
  title: string
}

const PageHeaderContainer = styled.div`
  align-items: center;
  background-color: #aaa;
  display: flex;
  padding: 16px 48px;
`

const PageHeaderTitle = styled.div`
  flex: 1 1 auto;
  padding: 0px 8px;
`

const PageHeaderUserName = styled.div`
  cursor: pointer;
  padding: 0px 8px;
`

const PageHeaderButton = styled(AsyncButton)`
  padding: 0px 8px;
`

const PageHeaderLink = styled(Link)`
  padding: 0px 8px;
`

const PageHeader = ({ title }: PageHeaderProps) => {
  const t = useTrans("PageHeader")
  const { isAuthenticated, userInfo } = useAuthContext()
  const { pathname } = useLocation()
  const signOut = useSignOut()

  const loginUrl = useMemo(
    () =>
      withSearchParams(ROUTES.login(), {
        callback: pathname,
      }),
    [pathname]
  )

  const changeName = useCallback(async () => {
    if (userInfo !== null) {
      const oldName = userInfo.name
      // eslint-disable-next-line no-alert
      const newName = window.prompt(t("userNamePrompt"), oldName)
      if (newName !== null && newName !== "" && newName !== oldName) {
        await userInfo.updateName(newName)
      }
    }
  }, [t, userInfo])

  return (
    <PageHeaderContainer>
      <PageHeaderTitle>{title}</PageHeaderTitle>
      {isAuthenticated && userInfo !== null ? (
        <>
          <PageHeaderUserName onClick={changeName} title={t("userNameTooltip")}>
            {userInfo.name}
          </PageHeaderUserName>
          <PageHeaderButton onClick={signOut}>{t("signOut")}</PageHeaderButton>
        </>
      ) : (
        <PageHeaderLink to={loginUrl}>{t("signIn")}</PageHeaderLink>
      )}
    </PageHeaderContainer>
  )
}

export default PageHeader
