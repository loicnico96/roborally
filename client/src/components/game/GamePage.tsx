import React from "react"

import { GameType } from "common/GameSettings"

export type GamePageProps = {
  gameType: GameType
}

const GamePageMetropolys = React.lazy(() => import("./metropolys/GamePage"))
const GamePageRoborally = React.lazy(() => import("./roborally/GamePage"))

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
