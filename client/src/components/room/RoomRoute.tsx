import React from "react"

import { RoomStatus } from "common/model/RoomData"
import GamePage from "components/roborally/GamePage"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"

import GameProvider from "./GameProvider"
import RoomPage from "./RoomPage"
import RoomProvider from "./RoomProvider"
import { getRoomStatus } from "./utils/getters"

const RoomRouteSwitch = () => {
  const roomId = useRoomId()
  const roomStatus = useRoomData(roomId, getRoomStatus)

  if (roomStatus !== RoomStatus.OPENED) {
    return (
      <GameProvider roomId={roomId}>
        <GamePage />
      </GameProvider>
    )
  }

  return <RoomPage />
}

const RoomRoute = () => {
  const roomId = useRoomId()

  return (
    <RoomProvider roomId={roomId}>
      <RoomRouteSwitch />
    </RoomProvider>
  )
}

export default React.memo(RoomRoute)
