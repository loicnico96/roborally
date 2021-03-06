import React from "react"

import { RoomStatus } from "common/model/RoomData"
import GamePage from "components/game/GamePage"
import GameProvider from "components/game/GameProvider"
import { BREADCRUMB_HOME, BREADCRUMB_ROOM_LIST } from "components/ui/Breadcrumb"
import PageContainer from "components/ui/PageContainer"
import PageHeader from "components/ui/PageHeader"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"

import { useRoomTitle } from "./hooks/useRoomTitle"
import RoomPage from "./RoomPage"
import RoomProvider from "./RoomProvider"
import { getGameType, getRoomStatus } from "./utils/getters"

const NAVIGATION_PARENTS = [BREADCRUMB_HOME, BREADCRUMB_ROOM_LIST]

const RoomRouteSwitch = () => {
  const roomId = useRoomId()
  const roomStatus = useRoomData(roomId, getRoomStatus)
  const gameType = useRoomData(roomId, getGameType)

  if (roomStatus !== RoomStatus.OPENED) {
    return (
      <GameProvider gameType={gameType} roomId={roomId}>
        <GamePage gameType={gameType} />
      </GameProvider>
    )
  }

  return <RoomPage />
}

const RoomRoute = () => {
  const roomId = useRoomId()
  const roomTitle = useRoomTitle(roomId)

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title={roomTitle} />
      <RoomProvider roomId={roomId}>
        <RoomRouteSwitch />
      </RoomProvider>
    </PageContainer>
  )
}

export default React.memo(RoomRoute)
