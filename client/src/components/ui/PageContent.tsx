import React from "react"
import styled from "styled-components"

import ErrorBoundary from "./ErrorBoundary"
import { renderError } from "./PageError"

export type PageContentProps = React.HtmlHTMLAttributes<HTMLDivElement>

const PageContentContainer = styled.div`
  padding: 24px 48px;
`

const PageContent = ({ children, ...props }: PageContentProps) => (
  <PageContentContainer {...props}>
    <ErrorBoundary renderError={renderError}>{children}</ErrorBoundary>
  </PageContentContainer>
)

export default PageContent
