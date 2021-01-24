import React from "react"

import { GamePhase } from "common/roborally/model/RoborallyState"
import { styledDivWithProps } from "utils/styles"

type GameUiTurnPhaseProps = {
  isCurrent: boolean
  phase: GamePhase
}

const PHASE_LABELS: Record<GamePhase, string> = {
  [GamePhase.STANDBY]: "New turn",
  [GamePhase.PROGRAM]: "Program",
  [GamePhase.RESOLVE_TRAPS]: "Trap holes",
  [GamePhase.RESOLVE_RANDOMIZERS]: "Randomizers",
  [GamePhase.RESOLVE_PLAYERS]: "Player actions",
  [GamePhase.RESOLVE_CONVEYORS_FAST]: "Express conveyors",
  [GamePhase.RESOLVE_CONVEYORS]: "Conveyors",
  [GamePhase.RESOLVE_PUSHERS]: "Pushers",
  [GamePhase.RESOLVE_CRUSHERS]: "Crushers",
  [GamePhase.RESOLVE_GEARS]: "Gears",
  [GamePhase.RESOLVE_LASERS]: "Lasers",
  [GamePhase.RESOLVE_REPAIRS]: "Repair sites",
  [GamePhase.RESOLVE_CHECKPOINTS]: "Checkpoints",
}

const GameUiTurnPhaseContainer = styledDivWithProps<GameUiTurnPhaseProps>()`
  ${props => (props.isCurrent ? "font-weight: bold;" : "")}
  margin-bottom: 8px;
  margin-top: 8px;
`

const GameUiTurnPhase = (props: GameUiTurnPhaseProps) => (
  <GameUiTurnPhaseContainer {...props}>
    {PHASE_LABELS[props.phase]}
  </GameUiTurnPhaseContainer>
)

export default GameUiTurnPhase
