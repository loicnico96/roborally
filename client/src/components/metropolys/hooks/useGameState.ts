import { useCallback } from "react"

import { RoomId } from "common/model/RoomData"
import { useRoomId } from "hooks/useRoomId"
import { useStore } from "hooks/useStore"
import { isLoaded, Resource } from "utils/resources"
import { Store } from "utils/store"
import { MetropolysState } from "common/metropolys/model/MetropolysState"

export function getGameResource(
  store: Store,
  roomId: RoomId
): Resource<MetropolysState> | undefined {
  return store.games[roomId] as Resource<MetropolysState> | undefined
}

export function getGameState(store: Store, roomId: RoomId): MetropolysState {
  const resource = getGameResource(store, roomId)

  if (resource === undefined || !isLoaded(resource)) {
    throw Error("Invalid game context")
  }

  return resource.data
}

export function useGameState<T>(selector: (room: MetropolysState) => T): T {
  const roomId = useRoomId()

  return useStore(
    useCallback(store => selector(getGameState(store, roomId)), [
      roomId,
      selector,
    ])
  )
}
