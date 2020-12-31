import React, { useCallback, useRef, useState } from "react"

import { Collection } from "common/firestore/collections"
import { GameType, getGameSettings } from "common/GameSettings"
import { RoomId } from "common/model/RoomData"
import { RoborallyState } from "common/roborally/model/RoborallyState"
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

  const [gameResource, setGameResource] = useState<Resource<RoborallyState>>(
    getLoadingResource(roomId)
  )

  const gameType = GameType.ROBORALLY

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

      async function resolveStateQueue() {
        try {
          isResolving.current = true
          while (stateQueue.current.length > 0) {
            let nextState = stateQueue.current.shift()
            if (nextState) {
              try {
                const { getContext, resolveState } = getGameSettings(gameType)
                const ctx = getContext(nextState, handleStateChanged)
                nextState = await ctx.resolve(resolveState)
              } catch (error) {
                console.error(error)
              }

              await handleStateChanged(nextState, 0)
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
        if (!isResolving.current) {
          resolveStateQueue()
        }
      } else {
        setGameResource(resource)
        currentState.current = null
        stateQueue.current = []
      }
    },
    [currentState, gameType, isResolving, setGameResource, stateQueue]
  )

  useFirestoreLoader(Collection.CLIENT, roomId, handleGameResource)

  return (
    <GameContext.Provider value={gameResource.data}>
      {isLoading(gameResource)
        ? renderLoading()
        : isError(gameResource)
        ? renderError(gameResource.error)
        : renderLoaded(gameResource.data)}
    </GameContext.Provider>
  )
}

export default GameContextProvider
