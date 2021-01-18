import { useCallback } from "react"

import { RoomId } from "common/model/RoomData"
import { getGameResource } from "components/roborally/hooks/useGameState"
import { getRoomResource } from "hooks/useRoomData"
import { useStore } from "hooks/useStore"
import { isLoaded } from "utils/resources"
import { Store } from "utils/store"
import { GameType } from "common/GameSettings"

export function getRoomTitle(store: Store, roomId: RoomId): string {
  const roomResource = getRoomResource(store, roomId)
  const gameResource = getGameResource(store, roomId)

  if (roomResource !== undefined && isLoaded(roomResource)) {
    const gameName = {
      [GameType.METROPOLYS]: "Metropolys",
      [GameType.ROBORALLY]: "Roborally",
    }[roomResource.data.game]

    if (gameResource !== undefined && isLoaded(gameResource)) {
      const { turn } = gameResource.data
      return `${gameName.toUpperCase()} - TURN ${turn}`
    }

    const { status } = roomResource.data
    return `${gameName.toUpperCase()} - ${status.toUpperCase()}`
  }

  return roomId
}

export function useRoomTitle(roomId: RoomId): string {
  return useStore(useCallback(store => getRoomTitle(store, roomId), [roomId]))
}
