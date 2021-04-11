import React from "react"

import { BREADCRUMB_HOME } from "components/ui/Breadcrumb"
import PageContainer from "components/ui/PageContainer"
import PageHeader from "components/ui/PageHeader"

import RoomListPage from "./RoomListPage"

const NAVIGATION_PARENTS = [BREADCRUMB_HOME]

const RoomListRoute = () => (
  <PageContainer>
    <PageHeader parents={NAVIGATION_PARENTS} title="Rooms" />
    <RoomListPage />
  </PageContainer>
)

export default RoomListRoute
