import React from "react"

import { RoomStatus } from "common/model/RoomData"
import { default as GamePageMetropolys } from "components/metropolys/GamePage"
import { default as GamePageRoborally } from "components/roborally/GamePage"
import { BREADCRUMB_HOME, BREADCRUMB_ROOM_LIST } from "components/ui/Breadcrumb"
import PageContainer from "components/ui/PageContainer"
import PageHeader from "components/ui/PageHeader"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"

import GameProvider from "./GameProvider"
import { useRoomTitle } from "./hooks/useRoomTitle"
import RoomPage from "./RoomPage"
import RoomProvider from "./RoomProvider"
import { getGameType, getRoomStatus } from "./utils/getters"
import { GameType } from "common/GameSettings"

const NAVIGATION_PARENTS = [BREADCRUMB_HOME, BREADCRUMB_ROOM_LIST]

const RoomRouteSwitch = () => {
  const roomId = useRoomId()
  const roomStatus = useRoomData(roomId, getRoomStatus)
  const gameType = useRoomData(roomId, getGameType)

  const GamePageComponent = {
    [GameType.METROPOLYS]: GamePageMetropolys,
    [GameType.ROBORALLY]: GamePageRoborally,
  }[gameType]

  if (roomStatus !== RoomStatus.OPENED) {
    return (
      <GameProvider roomId={roomId}>
        <GamePageComponent />
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
