import { useCallback } from "react"

import { RoomId } from "common/model/RoomData"
import { getGameResource } from "components/roborally/hooks/useGameState"
import { getRoomResource } from "hooks/useRoomData"
import { useStore } from "hooks/useStore"
import { isLoaded } from "utils/resources"
import { Store } from "utils/store"

export function getRoomTitle(store: Store, roomId: RoomId): string {
  const roomResource = getRoomResource(store, roomId)
  const gameResource = getGameResource(store, roomId)

  if (gameResource !== undefined && isLoaded(gameResource)) {
    const { turn } = gameResource.data
    return `ROBORALLY - TURN ${turn}`
  }

  if (roomResource !== undefined && isLoaded(roomResource)) {
    const { status } = roomResource.data
    return `ROBORALLY - ${status.toUpperCase()}`
  }

  return "ROBORALLY"
}

export function useRoomTitle(roomId: RoomId): string {
  return useStore(useCallback(store => getRoomTitle(store, roomId), [roomId]))
}
