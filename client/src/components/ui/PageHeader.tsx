import React from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignOut } from "firestore/auth/useSignOut"
import { useChangeName } from "hooks/useChangeName"
import { ROUTES, withSearchParams } from "utils/navigation"

import AsyncButton from "./AsyncButton"

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
  const { isAuthenticated, userInfo } = useAuthContext()
  const { pathname } = useLocation()
  const signOut = useSignOut()

  const loginUrl = withSearchParams(ROUTES.login(), { callback: pathname })

  const [changeName] = useChangeName()

  return (
    <PageHeaderContainer>
      <PageHeaderTitle>{title}</PageHeaderTitle>
      {isAuthenticated && userInfo !== null ? (
        <>
          <PageHeaderUserName
            onClick={changeName}
            title="Click to change user name"
          >
            {userInfo.name}
          </PageHeaderUserName>
          <PageHeaderButton onClick={signOut}>Sign out</PageHeaderButton>
        </>
      ) : (
        <PageHeaderLink to={loginUrl}>Sign in</PageHeaderLink>
      )}
    </PageHeaderContainer>
  )
}

export default PageHeader
