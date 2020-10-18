import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGameState, getRoomState } from "../Redux/selectors"
import { useGameLoader } from "./hooks/useGameLoader"
import { useRoomLoader } from "./hooks/useRoomLoader"
import { isLoading, isLoaded, isError } from "../utils/ObjectState"
import GamePage from "../Game/GamePage"

type RouteParams = {
  roomId: string
}

const RoomPage = () => {
  const { roomId } = useParams<RouteParams>()

  useGameLoader(roomId)
  useRoomLoader(roomId)

  const gameState = useSelector(getGameState)
  const roomState = useSelector(getRoomState)

  if (roomState === null || isLoading(roomState)) {
    return <div>Loading room...</div>
  }

  if (isError(roomState)) {
    return <div>Invalid room ID</div>
  }

  if (gameState !== null && isLoaded(gameState)) {
    return <GamePage />
  } else {
    return <div>Room {roomId}</div>
  }
}

export default RoomPage
