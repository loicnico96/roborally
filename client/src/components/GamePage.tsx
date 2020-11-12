import React from "react"
import { GameState } from "common/roborally/model/GameState"
import { RoomId } from "common/roborally/model/RoomData"
import Game from "./Game"

type GamePageProps = {
  roomId: RoomId
  gameState: GameState
}

const GamePage = ({ roomId, gameState }: GamePageProps) => (
  <Game gameState={gameState} roomId={roomId} />
)

export default GamePage
