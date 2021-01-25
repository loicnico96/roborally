import { useCallback } from "react"

import { RoomData, RoomId } from "common/model/RoomData"
import { useRoomData } from "./useRoomData"
import { GameOptions, GameType } from "common/GameSettings"

export function isGameType<T extends GameType>(
  room: RoomData,
  gameType: T
): room is RoomData<T> {
  return room.game === gameType
}

export function useRoomOptions<T extends GameType>(
  roomId: RoomId,
  gameType: T
): GameOptions<T> {
  return useRoomData(
    roomId,
    useCallback(
      roomData => {
        if (!isGameType(roomData, gameType)) {
          throw Error("Inconsistent state")
        }

        return roomData.options
      },
      [gameType]
    )
  )
}
