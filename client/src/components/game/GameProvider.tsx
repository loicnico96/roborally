import React, { ReactNode, useCallback, useRef } from "react"

import { Collection } from "common/firestore/collections"
import {
  GameEvent,
  GameState,
  GameType,
  getGameSettings,
} from "common/GameSettings"
import { RoomId } from "common/model/RoomData"
import { RoborallyEvent } from "common/roborally/model/RoborallyEvent"
import { renderError } from "components/ui/PageError"
import { renderLoader } from "components/ui/PageLoader"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"
import { useActions } from "hooks/useActions"
import { useStore } from "hooks/useStore"
import { pause } from "utils/dom"
import {
  Resource,
  isLoading,
  isLoaded,
  getLoadedResource,
} from "utils/resources"

import { getGameResource } from "./hooks/useGameState"

export const EVENT_DURATION_SHORT = 200
export const EVENT_DURATION_NORMAL = 500

export type GameProviderProps<T extends GameType> = {
  children: ReactNode
  gameType: T
  roomId: RoomId
}

function getEventDuration(event: GameEvent): number {
  switch (event) {
    case RoborallyEvent.CHANGE_PHASE:
      return EVENT_DURATION_SHORT
    case RoborallyEvent.CHANGE_PLAYER:
      return EVENT_DURATION_SHORT
    default:
      return EVENT_DURATION_NORMAL
  }
}

export function useGameLoading(gameType: GameType, roomId: RoomId): boolean {
  return useStore(
    useCallback(
      store => {
        const resource = getGameResource(store, gameType, roomId)
        return !resource || isLoading(resource)
      },
      [gameType, roomId]
    )
  )
}

export function useGameError(gameType: GameType, roomId: RoomId): Error | null {
  return useStore(
    useCallback(
      store => {
        const resource = getGameResource(store, gameType, roomId)
        return resource?.error ?? null
      },
      [gameType, roomId]
    )
  )
}

const GameProvider = <T extends GameType>({
  children,
  gameType,
  roomId,
}: GameProviderProps<T>) => {
  const { setGameResource } = useActions()

  const isResolving = useRef(false)
  const stateQueue = useRef<GameState<T>[]>([])

  const gameLoading = useGameLoading(gameType, roomId)
  const gameError = useGameError(gameType, roomId)

  const handleGameResource = useCallback(
    (resource: Resource<GameState>) => {
      const { resolveState } = getGameSettings(gameType)

      function setGameState(state: GameState<T>) {
        setGameResource(getLoadedResource(roomId, state))
      }

      async function onStateChanged(state: GameState<T>, event: GameEvent<T>) {
        setGameState(state)
        const duration = getEventDuration(event)
        await pause(duration)
      }

      async function resolveStateQueue() {
        try {
          isResolving.current = true
          while (stateQueue.current.length > 0) {
            const nextState = stateQueue.current.shift()
            if (nextState !== undefined) {
              setGameState(await resolveState(nextState, onStateChanged))
            }
          }
        } catch (error) {
          console.error(error)
        } finally {
          isResolving.current = false
        }
      }

      if (isLoaded(resource)) {
        stateQueue.current.push(resource.data)
        if (isResolving.current === false) {
          resolveStateQueue()
        }
      } else {
        setGameResource(resource)
      }
    },
    [gameType, isResolving, roomId, setGameResource, stateQueue]
  )

  useFirestoreLoader(Collection.CLIENT, roomId, handleGameResource)

  if (gameLoading) {
    return renderLoader("Loading game...")
  } else if (gameError !== null) {
    return renderError(gameError)
  } else {
    return <>{children}</>
  }
}

export default GameProvider
