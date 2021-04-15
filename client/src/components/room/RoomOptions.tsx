import React from "react"

import { GameType } from "common/GameSettings"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"

import { getGameType } from "./utils/getters"

const RoomOptionsRoborally = React.lazy(() => import("./RoomOptionsRoborally"))

const RoomOptions = () => {
  const roomId = useRoomId()
  const gameType = useRoomData(roomId, getGameType)

  switch (gameType) {
    case GameType.ROBORALLY:
      return <RoomOptionsRoborally />
    default:
      return null
  }
}

export default RoomOptions
