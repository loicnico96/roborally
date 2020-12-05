import React from "react"
import { Link } from "react-router-dom"

export type BreadcrumbProps = {
  path?: string
  title: string
}

const Breadcrumb = ({ path = "#", title }: BreadcrumbProps) => (
  <Link to={path}>{title}</Link>
)

export default Breadcrumb
