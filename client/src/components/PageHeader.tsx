import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignOut } from "firestore/auth/useSignOut"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import React, { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { ROUTES, withSearchParams } from "utils/navigation"

type PageHeaderProps = {
  title: string
}

const PageHeaderContainer = styled.div`
  align-items: center;
  background-color: lightskyblue;
  display: flex;
  padding: 8px 16px;
`

const PageHeaderTitle = styled.div`
  flex: 1 1 auto;
  padding: 0px 8px;
`

const PageHeaderUserName = styled.div`
  padding: 0px 8px;
`

const PageHeaderButton = styled.button`
  padding: 0px 8px;
`

const PageHeader = ({ title }: PageHeaderProps) => {
  const { isAuthenticated, userId } = useAuthContext()
  const [signOut, isLoading] = useAsyncHandler(useSignOut())
  const { pathname } = useLocation()

  const loginUrl = useMemo(
    () =>
      withSearchParams(ROUTES.login(), {
        callback: pathname,
      }),
    [pathname]
  )

  return (
    <PageHeaderContainer>
      <PageHeaderTitle>{title}</PageHeaderTitle>
      {isAuthenticated && userId !== null ? (
        <>
          <PageHeaderUserName>{userId}</PageHeaderUserName>
          <PageHeaderButton onClick={signOut} disabled={isLoading}>
            Sign out
          </PageHeaderButton>
        </>
      ) : (
        <PageHeaderButton>
          <Link to={loginUrl}>Sign in</Link>
        </PageHeaderButton>
      )}
    </PageHeaderContainer>
  )
}

export default PageHeader
