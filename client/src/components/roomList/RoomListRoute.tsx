import React from "react"

import { BREADCRUMB_HOME } from "components/ui/Breadcrumb"
import PageContainer from "components/ui/PageContainer"
import PageHeader from "components/ui/PageHeader"

import RoomListPage from "./RoomListPage"
import RoomListProvider from "./RoomListProvider"

const NAVIGATION_PARENTS = [BREADCRUMB_HOME]

const RoomListRoute = () => (
  <PageContainer>
    <PageHeader parents={NAVIGATION_PARENTS} title="ROOMS" />
    <RoomListProvider>
      {rooms => <RoomListPage rooms={rooms} />}
    </RoomListProvider>
  </PageContainer>
)

export default RoomListRoute
