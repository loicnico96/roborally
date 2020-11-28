import React from "react"

import { useGameState } from "components/room/GameContext"
import { useRoomId } from "components/room/RoomContext"

import Game from "./Game"

const GamePage = () => {
  const roomId = useRoomId()
  const gameState = useGameState()
  return <Game gameState={gameState} roomId={roomId} />
}

export default GamePage
