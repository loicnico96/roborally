import { useCallback } from "react"

import { GameState, GameType } from "common/GameSettings"
import { RoomId } from "common/model/RoomData"
import { useRoomId } from "hooks/useRoomId"
import { useStore } from "hooks/useStore"
import { isLoaded, Resource } from "utils/resources"
import { Store } from "utils/store"

export function getGameResource<T extends GameType>(
  store: Store,
  gameType: T,
  roomId: RoomId
): Resource<GameState<T>> | undefined {
  const resources = store.games[gameType]
  return resources?.[roomId] as Resource<GameState<T>> | undefined
}

export function getGameState<T extends GameType>(
  store: Store,
  gameType: T,
  roomId: RoomId
): GameState<T> {
  const resource = getGameResource(store, gameType, roomId)

  if (resource === undefined || !isLoaded(resource)) {
    throw Error("Invalid game context")
  }

  return resource.data
}

export function useGameState<T extends GameType, S>(
  gameType: T,
  selector: (state: GameState<T>) => S
): S {
  const roomId = useRoomId()

  return useStore(
    useCallback(store => selector(getGameState(store, gameType, roomId)), [
      gameType,
      roomId,
      selector,
    ])
  )
}
