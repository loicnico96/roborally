import React from "react"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { RoomId } from "common/roborally/model/RoomData"
import Game from "./Game"

type GamePageProps = {
  roomId: RoomId
  gameState: RoborallyState
}

const GamePage = ({ roomId, gameState }: GamePageProps) => (
  <Game gameState={gameState} roomId={roomId} />
)

export default GamePage
