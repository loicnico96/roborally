import React, { useCallback, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Resource,
  isLoading,
  isError,
  isLoaded,
  getLoadedResource,
} from "utils/resources"
import { RoomData } from "common/model/RoomData"
import { GameState } from "common/model/GameState"
import { Collection } from "common/firestore/collections"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"
import GamePage from "./GamePage"
import { resolveTurn } from "common/runtime/resolveTurn"

type RouteParams = {
  roomId: string
}

const RoomPage = () => {
  const { roomId } = useParams<RouteParams>()

  const [roomResource, setRoomResource] = useState<Resource<RoomData> | null>(
    null
  )

  const isResolving = useRef(false)
  const stateQueue = useRef<GameState[]>([])
  const currentState = useRef<GameState | undefined>(undefined)

  const [gameResource, setGameResource] = useState<Resource<{
    prevState: GameState
    state: GameState
  }> | null>(null)

  const handleGameResource = useCallback(
    async (resource: Resource<GameState>) => {
      async function handleStateChanged(
        nextState: GameState,
        animDuration: number
      ) {
        setGameResource(
          getLoadedResource(resource.id, {
            prevState: currentState.current ?? nextState,
            state: nextState,
          })
        )

        currentState.current = nextState

        if (animDuration > 0) {
          await new Promise(resolve => {
            setTimeout(resolve, animDuration * 500)
          })
        }
      }

      function allPlayersReady(gameStame: GameState): boolean {
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
                  console.error(error)
                }
              } else {
                await handleStateChanged(nextState, 0)
              }
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
        currentState.current = undefined
        stateQueue.current = []
      }
    },
    [currentState, isResolving, setGameResource, stateQueue]
  )

  useFirestoreLoader(Collection.ROOM, roomId, setRoomResource)
  useFirestoreLoader(Collection.CLIENT, roomId, handleGameResource)

  if (roomResource === null || isLoading(roomResource)) {
    return <div>Loading room...</div>
  }

  if (isError(roomResource)) {
    return <div>Invalid room ID</div>
  }

  if (gameResource !== null && isLoaded(gameResource)) {
    return <GamePage roomId={roomId} gameState={gameResource.data.state} />
  }

  return <div>Room {roomId}</div>
}

export default RoomPage
