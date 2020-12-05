import React, { useCallback, useRef, useState } from "react"

import { Collection } from "common/firestore/collections"
import { RoomId } from "common/model/RoomData"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { resolveTurn } from "common/roborally/resolveTurn"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"
import {
  Resource,
  isLoading,
  isError,
  isLoaded,
  getLoadedResource,
  getLoadingResource,
} from "utils/resources"

import GameContext from "./GameContext"
import { useToast } from "hooks/useToast"

export type GameContextProviderProps = {
  renderError: (error: Error) => JSX.Element
  renderLoaded: (data: RoborallyState) => JSX.Element
  renderLoading: () => JSX.Element
  roomId: RoomId
}

const GameContextProvider = ({
  renderError,
  renderLoaded,
  renderLoading,
  roomId,
}: GameContextProviderProps) => {
  const isResolving = useRef(false)
  const stateQueue = useRef<RoborallyState[]>([])
  const currentState = useRef<RoborallyState | null>(null)
  const toast = useToast()

  const [gameResource, setGameResource] = useState<Resource<RoborallyState>>(
    getLoadingResource(roomId)
  )

  const handleGameResource = useCallback(
    async (resource: Resource<RoborallyState>) => {
      async function handleStateChanged(
        nextState: RoborallyState,
        animDuration = 1
      ) {
        setGameResource(getLoadedResource(resource.id, nextState))

        currentState.current = nextState

        if (animDuration > 0) {
          await new Promise(resolve => {
            setTimeout(resolve, animDuration * 500)
          })
        }
      }

      function allPlayersReady(gameStame: RoborallyState): boolean {
        const players = Object.values(gameStame.players)
        return players.every(player => player.ready)
      }

      async function resolveStateQueue() {
        try {
          isResolving.current = true
          while (stateQueue.current.length > 0) {
            const nextState = stateQueue.current.shift()
            if (nextState) {
              if (nextState.phase === "program" && allPlayersReady(nextState)) {
                try {
                  await resolveTurn(nextState, handleStateChanged)
                } catch (error) {
                  toast.error(error)
                }
              } else {
                await handleStateChanged(nextState, 0)
              }
            }
          }
        } catch (error) {
          toast.error(error)
        } finally {
          isResolving.current = false
        }
      }

      if (isLoaded(resource)) {
        stateQueue.current.push(resource.data)
        if (!isResolving.current) {
          resolveStateQueue()
        }
      } else {
        setGameResource(resource)
        currentState.current = null
        stateQueue.current = []
      }
    },
    [currentState, isResolving, setGameResource, stateQueue]
  )

  useFirestoreLoader(Collection.CLIENT, roomId, handleGameResource)

  if (isLoading(gameResource)) {
    return renderLoading()
  }

  if (isError(gameResource)) {
    return renderError(gameResource.error)
  }

  return (
    <GameContext.Provider value={gameResource.data}>
      {renderLoaded(gameResource.data)}
    </GameContext.Provider>
  )
}

export default GameContextProvider
