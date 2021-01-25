import React from "react"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { GameType } from "common/GameSettings"
import RoomOptionsRoborally from "./RoomOptionsRoborally"
import { getGameType } from "./utils/getters"

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
