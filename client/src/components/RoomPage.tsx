import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useCurrentPlayerId } from "hooks/useCurrentPlayerId"
import { Resource, isLoading, isError, isLoaded } from "utils/resources"
import { RoomData } from "common/model/RoomData"
import { GameState } from "common/model/GameState"
import { Collection } from "common/firestore/collections"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"

type RouteParams = {
  roomId: string
}

const RoomPage = () => {
  const { roomId } = useParams<RouteParams>()
  const playerId = useCurrentPlayerId()

  const [roomResource, setRoomResource] = useState<Resource<RoomData> | null>(
    null
  )

  const [gameResource, setGameResource] = useState<Resource<GameState> | null>(
    null
  )

  useFirestoreLoader(Collection.ROOM, roomId, setRoomResource)
  useFirestoreLoader(Collection.GAME, roomId, setGameResource)

  if (roomResource === null || isLoading(roomResource)) {
    return <div>Loading room...</div>
  }

  if (isError(roomResource)) {
    return <div>Invalid room ID</div>
  }

  if (gameResource !== null && isLoaded(gameResource)) {
    const gameState = gameResource.data
    const player = gameState.players[playerId]
    if (player === undefined) {
      return <div>Invalid player ID</div>
    }

    return (
      <div>
        <p>
          Room {roomId} - Turn {gameState.turn} - Phase {gameState.phase}
        </p>
        <p>
          Player {playerId} - Position: ({player.pos.x}-{player.pos.y})
        </p>
        <p>Ready {player.ready ? "true" : "false"}</p>
      </div>
    )
  } else {
    return <div>Room {roomId}</div>
  }
}

export default RoomPage
