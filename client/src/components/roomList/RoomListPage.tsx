import React from "react"

import PageContent from "components/ui/PageContent"

import { useGameParam } from "./hooks/useGameParam"
import RoomList from "./RoomList"
import RoomListPageHeader from "./RoomListPageHeader"
import RoomListProvider from "./RoomListProvider"

const RoomListPage = () => {
  const { gameType } = useGameParam()

  return (
    <PageContent>
      <RoomListPageHeader />
      <RoomListProvider gameType={gameType}>
        {rooms => <RoomList rooms={rooms} />}
      </RoomListProvider>
    </PageContent>
  )
}

export default RoomListPage
