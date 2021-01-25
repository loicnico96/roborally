import { useCallback, useRef } from "react"

import { Collection } from "common/firestore/collections"
import { getGameSettings } from "common/GameSettings"
import { RoomId } from "common/model/RoomData"
import { RoborallyEvent } from "common/roborally/model/RoborallyEvent"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { getGameResource } from "components/roborally/hooks/useGameState"
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

export const EVENT_DURATION_SHORT = 200
export const EVENT_DURATION_NORMAL = 500

export type GameProviderProps = {
  children: JSX.Element
  roomId: RoomId
}

function getEventDuration(event: RoborallyEvent): number {
  switch (event) {
    case RoborallyEvent.CHANGE_PHASE:
      return EVENT_DURATION_SHORT
    case RoborallyEvent.CHANGE_PLAYER:
      return EVENT_DURATION_SHORT
    default:
      return EVENT_DURATION_NORMAL
  }
}

export function useGameLoading(roomId: RoomId): boolean {
  return useStore(
    useCallback(
      store => {
        const resource = getGameResource(store, roomId)
        return resource === undefined || isLoading(resource)
      },
      [roomId]
    )
  )
}

export function useGameError(roomId: RoomId): Error | null {
  return useStore(
    useCallback(
      store => {
        const resource = getGameResource(store, roomId)
        return resource?.error ?? null
      },
      [roomId]
    )
  )
}

const GameProvider = ({ children, roomId }: GameProviderProps) => {
  const { setGameResource } = useActions()

  const isResolving = useRef(false)
  const stateQueue = useRef<RoborallyState[]>([])

  const gameLoading = useGameLoading(roomId)
  const gameError = useGameError(roomId)

  const handleGameResource = useCallback(
    (resource: Resource<RoborallyState>) => {
      const { resolveState } = getGameSettings("roborally")

      function setGameState(state: RoborallyState) {
        setGameResource(getLoadedResource(roomId, state))
      }

      async function onStateChanged(
        state: RoborallyState,
        event: RoborallyEvent
      ) {
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
    [isResolving, roomId, setGameResource, stateQueue]
  )

  useFirestoreLoader(Collection.CLIENT, roomId, handleGameResource)

  if (gameLoading) {
    return renderLoader("Loading game...")
  } else if (gameError !== null) {
    return renderError(gameError)
  } else {
    return children
  }
}

export default GameProvider
