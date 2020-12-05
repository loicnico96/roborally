import React from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignOut } from "firestore/auth/useSignOut"
import { useChangeName } from "hooks/useChangeName"
import { ROUTES, withSearchParams } from "utils/navigation"

import AsyncButton from "./AsyncButton"
import Breadcrumb, { BreadcrumbProps } from "./Breadcrumb"
import BreadcrumbSeparator from "./BreadcrumbSeparator"

export type PageHeaderProps = {
  parents?: BreadcrumbProps[]
  title: string
}

const PageHeaderContainer = styled.div`
  align-items: center;
  background-color: #aaa;
  column-gap: 8px;
  display: flex;
  padding: 16px 48px;
`

const PageHeaderBreadcrumbs = styled.div`
  flex: 1 1 auto;
`

const PageHeaderUserName = styled.div`
  cursor: pointer;
`

const PageHeader = ({ parents = [], title }: PageHeaderProps) => {
  const { isAuthenticated, userInfo } = useAuthContext()
  const { pathname } = useLocation()
  const signOut = useSignOut()

  const loginUrl = withSearchParams(ROUTES.login(), { callback: pathname })

  const [changeName] = useChangeName()

  return (
    <PageHeaderContainer>
      <PageHeaderBreadcrumbs>
        {parents.map(parent => (
          <React.Fragment key={parent.path}>
            <Breadcrumb {...parent} />
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <Breadcrumb title={title} />
      </PageHeaderBreadcrumbs>
      {isAuthenticated && userInfo !== null ? (
        <>
          <PageHeaderUserName
            onClick={changeName}
            title="Click to change user name"
          >
            {userInfo.name}
          </PageHeaderUserName>
          <AsyncButton onClick={signOut}>Sign out</AsyncButton>
        </>
      ) : (
        <Link to={loginUrl}>Sign in</Link>
      )}
    </PageHeaderContainer>
  )
}

export default PageHeader
