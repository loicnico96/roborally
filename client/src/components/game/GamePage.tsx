import React from "react"

import { GameType } from "common/GameSettings"

import GamePageMetropolys from "./metropolys/GamePage"
import GamePageRoborally from "./roborally/GamePage"

export type GamePageProps = {
  gameType: GameType
}

const GamePage = ({ gameType }: GamePageProps) => {
  switch (gameType) {
    case GameType.METROPOLYS:
      return <GamePageMetropolys />
    case GameType.ROBORALLY:
      return <GamePageRoborally />
    default:
      throw Error("Unknown game type")
  }
}

export default GamePage
