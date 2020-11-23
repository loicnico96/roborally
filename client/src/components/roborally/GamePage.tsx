import React from "react"
import Game from "./Game"
import { useGameState } from "components/room/GameContext"
import { useRoomId } from "components/room/RoomContext"

const GamePage = () => {
  const roomId = useRoomId()
  const gameState = useGameState()
  return <Game gameState={gameState} roomId={roomId} />
}

export default GamePage
