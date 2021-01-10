import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId } from "common/model/RoomData"

import { useRoomData } from "./useRoomData"

export function getPlayerName(room: RoomData, playerId: PlayerId): string {
  return room.players[playerId].name
}

export function usePlayerName(roomId: RoomId, playerId: PlayerId): string {
  return useRoomData(
    roomId,
    useCallback(room => getPlayerName(room, playerId), [playerId])
  )
}
