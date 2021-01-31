import { useCallback } from "react"

import { RoomId, RoomStatus } from "common/model/RoomData"
import { getGameResource } from "components/game/hooks/useGameState"
import { getRoomResource } from "hooks/useRoomData"
import { useStore } from "hooks/useStore"
import { isLoaded } from "utils/resources"
import { Store } from "utils/store"

export function getRoomTitle(store: Store, roomId: RoomId): string {
  const roomResource = getRoomResource(store, roomId)
  if (roomResource && isLoaded(roomResource)) {
    const { game, status } = roomResource.data

    const gameName = {
      metropolys: "Metropolys",
      roborally: "Roborally",
    }[game]

    const gameResource = getGameResource(store, game, roomId)
    if (gameResource && isLoaded(gameResource)) {
      const { turn } = gameResource.data
      return `${gameName} - Turn ${turn}`
    }

    const statusName = {
      [RoomStatus.OPENED]: "Open",
      [RoomStatus.ONGOING]: "Ongoing",
      [RoomStatus.FINISHED]: "Finished",
    }[status]

    return `${gameName} - ${statusName}`
  }

  return `Room ${roomId}`
}

export function useRoomTitle(roomId: RoomId): string {
  return useStore(useCallback(store => getRoomTitle(store, roomId), [roomId]))
}
