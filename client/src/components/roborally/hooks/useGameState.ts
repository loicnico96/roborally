import { useCallback } from "react"

import { RoomId } from "common/model/RoomData"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { useRoomId } from "hooks/useRoomId"
import { useStore } from "hooks/useStore"
import { isLoaded, Resource } from "utils/resources"
import { Store } from "utils/store"

export function getGameResource(
  store: Store,
  roomId: RoomId
): Resource<RoborallyState> | undefined {
  return store.games[roomId]
}

export function getGameState(store: Store, roomId: RoomId): RoborallyState {
  const resource = getGameResource(store, roomId)

  if (resource === undefined || !isLoaded(resource)) {
    throw Error("Invalid game context")
  }

  return resource.data
}

export function useGameState<T>(selector: (room: RoborallyState) => T): T {
  const roomId = useRoomId()

  return useStore(
    useCallback(store => selector(getGameState(store, roomId)), [
      roomId,
      selector,
    ])
  )
}
