import React from "react"

import { BREADCRUMB_HOME } from "components/ui/Breadcrumb"
import PageContainer from "components/ui/PageContainer"
import PageHeader from "components/ui/PageHeader"

import { useGameParam } from "./hooks/useGameParam"
import RoomListPage from "./RoomListPage"
import RoomListProvider from "./RoomListProvider"

const NAVIGATION_PARENTS = [BREADCRUMB_HOME]

const RoomListRoute = () => {
  const { gameType } = useGameParam()

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title="Rooms" />
      <RoomListProvider gameType={gameType}>
        {rooms => <RoomListPage rooms={rooms} />}
      </RoomListProvider>
    </PageContainer>
  )
}

export default RoomListRoute
