import { useCallback } from "react"

import { useRoomId } from "hooks/useRoomId"
import { useStore } from "hooks/useStore"
import { isLoaded, Resource } from "utils/resources"
import { GameState, GameType } from "common/GameSettings"
import { Store } from "utils/store"
import { RoomId } from "common/model/RoomData"

export function getGameResource(
  store: Store,
  roomId: RoomId
): Resource<GameState> | undefined {
  return store.games[roomId]
}

export function getGameState<T extends GameType>(
  store: Store,
  _gameType: T,
  roomId: RoomId
): GameState<T> {
  const resource = getGameResource(store, roomId)

  if (resource === undefined || !isLoaded(resource)) {
    throw Error("Invalid game context")
  }

  return resource.data as GameState<T>
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
