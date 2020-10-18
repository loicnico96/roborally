import React from "react"
import Board from "./Board"
import { useGameData } from "../Room/hooks/useGameData"

const Game = () => {
  const { boardId } = useGameData()

  return (
    <div>
      <div>Game page {boardId}</div>
      <Board />
    </div>
  )
}

export default Game
