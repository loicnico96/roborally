import React, { ReactNode } from "react"
import styled from "styled-components"

import ErrorBoundary from "./ErrorBoundary"
import { renderError } from "./PageError"

export type PageContentProps = {
  children?: ReactNode
}

const PageContentContainer = styled.div`
  padding: 24px 48px;
`

const PageContent = ({ children }: PageContentProps) => (
  <PageContentContainer>
    <ErrorBoundary renderError={renderError}>{children}</ErrorBoundary>
  </PageContentContainer>
)

export default PageContent
