import React from "react"
import { GamePhase } from "common/model/GameState"

type GameUiTurnPhaseProps = {
  isCurrent: boolean
  phase: GamePhase
}

const GameUiTurnPhase = ({ isCurrent, phase }: GameUiTurnPhaseProps) => (
  <p>{isCurrent ? <b>{phase}</b> : phase}</p>
)

export default GameUiTurnPhase
