import React from "react"
import styled from "styled-components"

import Spinner from "./Spinner"

export type PageLoaderProps = {
  message?: string
}

const PageLoaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  min-width: 100%;
`

const PageLoaderMessage = styled.div``

const PageLoader = ({ message }: PageLoaderProps) => (
  <PageLoaderContainer>
    <Spinner size={96} />
    {!!message && <PageLoaderMessage>{message}</PageLoaderMessage>}
  </PageLoaderContainer>
)

export function renderLoader(message?: string): JSX.Element {
  return <PageLoader message={message} />
}

export default PageLoader
