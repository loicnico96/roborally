import { useCallback } from "react"

import { RoomId, RoomStatus } from "common/model/RoomData"
import { getRoomResource } from "hooks/useRoomData"
import { useStore } from "hooks/useStore"
import { isLoaded } from "utils/resources"
import { Store } from "utils/store"
import { getGameResource } from "hooks/useGameState"

export function getRoomTitle(store: Store, roomId: RoomId): string {
  const roomResource = getRoomResource(store, roomId)
  const gameResource = getGameResource(store, roomId)

  if (gameResource !== undefined && isLoaded(gameResource)) {
    const { turn } = gameResource.data
    return `Roborally - Turn ${turn}`
  }

  if (roomResource !== undefined && isLoaded(roomResource)) {
    const { status } = roomResource.data
    const statusName = {
      [RoomStatus.OPENED]: "Open",
      [RoomStatus.ONGOING]: "Ongoing",
      [RoomStatus.FINISHED]: "Finished",
    }[status]

    return `Roborally - ${statusName}`
  }

  return "Roborally"
}

export function useRoomTitle(roomId: RoomId): string {
  return useStore(useCallback(store => getRoomTitle(store, roomId), [roomId]))
}
