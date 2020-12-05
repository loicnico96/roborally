import React from "react"
import { Link } from "react-router-dom"

import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { ROUTES } from "utils/navigation"

const HomeRoute = () => (
  <PageContainer>
    <PageHeader title="HOME" />
    <PageContent>
      <Link to={ROUTES.roomList()}>Open rooms</Link>
    </PageContent>
  </PageContainer>
)

export default HomeRoute
