import React from "react"
import styled from "styled-components"

import { ErrorComponentProps } from "./ErrorBoundary"

const PageErrorContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100%;
  min-width: 100%;
`

const PageErrorMessage = styled.div``

const PageError = ({ error }: ErrorComponentProps) => (
  <PageErrorContainer>
    <PageErrorMessage>{error.message}</PageErrorMessage>
  </PageErrorContainer>
)

export function renderError(error: Error): JSX.Element {
  return <PageError error={error} />
}

export default PageError
