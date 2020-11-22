import React from "react"
import { GamePhase } from "common/roborally/model/RoborallyState"

type GameUiTurnPhaseProps = {
  isCurrent: boolean
  phase: GamePhase
}

const PHASE_LABELS: Record<GamePhase, string> = {
  [GamePhase.STANDBY]: "New turn",
  [GamePhase.PROGRAM]: "Program",
  [GamePhase.RESOLVE_PLAYERS]: "Player actions",
  [GamePhase.RESOLVE_CONVEYORS_FAST]: "Fast conveyors",
  [GamePhase.RESOLVE_CONVEYORS]: "All conveyors",
  [GamePhase.RESOLVE_CRUSHERS]: "Crushers",
  [GamePhase.RESOLVE_GEARS]: "Gears",
  [GamePhase.RESOLVE_LASERS]: "Lasers",
  [GamePhase.RESOLVE_CHECKPOINTS]: "Checkpoints",
}

const GameUiTurnPhase = (props: GameUiTurnPhaseProps) => {
  if (props.isCurrent) {
    return (
      <p>
        <b>{PHASE_LABELS[props.phase]}</b>
      </p>
    )
  } else {
    return <p>{PHASE_LABELS[props.phase]}</p>
  }
}

export default GameUiTurnPhase