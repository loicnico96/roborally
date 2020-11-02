import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Resource, isLoading, isError, isLoaded } from "utils/resources"
import { RoomData } from "common/model/RoomData"
import { GameState } from "common/model/GameState"
import { Collection } from "common/firestore/collections"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"
import GamePage from "./GamePage"

type RouteParams = {
  roomId: string
}

const RoomPage = () => {
  const { roomId } = useParams<RouteParams>()

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
    return <GamePage roomId={roomId} gameState={gameResource.data} />
  }

  return <div>Room {roomId}</div>
}

export default RoomPage
