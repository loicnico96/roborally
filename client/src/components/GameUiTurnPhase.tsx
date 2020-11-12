import React from "react"
import { GamePhase } from "common/roborally/model/RoborallyState"

type GameUiTurnPhaseProps = {
  isCurrent: boolean
  phase: GamePhase
  sequence: number
}

const GameUiTurnPhase = (props: GameUiTurnPhaseProps) => {
  if (props.isCurrent) {
    return (
      <p>
        <b>
          {props.phase} - {props.sequence}
        </b>
      </p>
    )
  } else {
    return <p>{props.phase}</p>
  }
}

export default GameUiTurnPhase
