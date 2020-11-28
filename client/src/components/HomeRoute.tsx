import React from "react"
import { Link } from "react-router-dom"

import { ROUTES } from "utils/navigation"

import PageHeader from "./PageHeader"

const HomeRoute = () => (
  <div>
    <PageHeader title="Home" />
    <div>
      <Link to={ROUTES.roomList()}>Open rooms</Link>
    </div>
  </div>
)

export default HomeRoute
