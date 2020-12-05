import React from "react"
import styled from "styled-components"

const SEPARATOR = ">"

const BreadcrumbSeparatorText = styled.span`
  margin: 0px 8px;
`

const BreadcrumbSeparator = () => (
  <BreadcrumbSeparatorText>{SEPARATOR}</BreadcrumbSeparatorText>
)

export default BreadcrumbSeparator
