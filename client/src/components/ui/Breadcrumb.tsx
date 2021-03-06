import React from "react"
import { Link } from "react-router-dom"

import { ROUTES } from "utils/navigation"

export type BreadcrumbProps = {
  path: string
  title: string
}

export const BREADCRUMB_HOME: BreadcrumbProps = {
  title: "Home",
  path: ROUTES.home(),
}

export const BREADCRUMB_ROOM_LIST: BreadcrumbProps = {
  title: "Rooms",
  path: ROUTES.roomList(),
}

const Breadcrumb = ({ path, title }: BreadcrumbProps) => (
  <Link to={path}>{title}</Link>
)

export default Breadcrumb
