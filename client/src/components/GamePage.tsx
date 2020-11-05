import React from "react"
import { GameState } from "common/model/GameState"
import { RoomId } from "common/model/RoomData"
import Game from "./Game"

type GamePageProps = {
  roomId: RoomId
  gameState: GameState
}

const GamePage = ({ roomId, gameState }: GamePageProps) => (
  <Game gameState={gameState} roomId={roomId} />
)

export default GamePage
