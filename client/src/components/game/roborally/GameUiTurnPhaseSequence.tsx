import React from "react"
import styled from "styled-components"

import { FeatureType } from "common/roborally/model/BoardData"
import { GamePhase } from "common/roborally/model/RoborallyState"

import GameUiTurnPhase from "./GameUiTurnPhase"
import { useRoborallyState } from "./hooks/useRoborallyState"
import {
  getBoardFeatures,
  getCurrentPhase,
  getCurrentSequence,
} from "./utils/getters"

const TURN_PHASES = [
  GamePhase.STANDBY,
  GamePhase.PROGRAM,
  GamePhase.RESOLVE_TRAPS,
  GamePhase.RESOLVE_RANDOMIZERS,
  GamePhase.RESOLVE_PLAYERS,
  GamePhase.RESOLVE_CONVEYORS_FAST,
  GamePhase.RESOLVE_CONVEYORS,
  GamePhase.RESOLVE_PUSHERS,
  GamePhase.RESOLVE_CRUSHERS,
  GamePhase.RESOLVE_GEARS,
  GamePhase.RESOLVE_LASERS,
  GamePhase.RESOLVE_REPAIRS,
  GamePhase.RESOLVE_CHECKPOINTS,
]

function isPhaseAvailable(phase: GamePhase, features: FeatureType[]): boolean {
  switch (phase) {
    case GamePhase.RESOLVE_TRAPS:
      return features.includes(FeatureType.TRAP)
    case GamePhase.RESOLVE_RANDOMIZERS:
      return features.includes(FeatureType.RANDOM)
    case GamePhase.RESOLVE_CONVEYORS_FAST:
      return features.includes(FeatureType.CONVEYOR_FAST)
    case GamePhase.RESOLVE_CONVEYORS:
      return features.includes(FeatureType.CONVEYOR)
    case GamePhase.RESOLVE_PUSHERS:
      return features.includes(FeatureType.PUSHER)
    case GamePhase.RESOLVE_CRUSHERS:
      return features.includes(FeatureType.CRUSHER)
    case GamePhase.RESOLVE_GEARS:
      return features.includes(FeatureType.GEAR)
    case GamePhase.RESOLVE_REPAIRS:
      return features.includes(FeatureType.REPAIR)
    default:
      return true
  }
}

function useTurnPhases(): GamePhase[] {
  const features = useRoborallyState(getBoardFeatures)
  return TURN_PHASES.filter(phase => isPhaseAvailable(phase, features))
}

function isResolving(phase: GamePhase): boolean {
  return ![GamePhase.STANDBY, GamePhase.PROGRAM].includes(phase)
}

const Container = styled.div`
  width: 240px;
`

const SequenceContainer = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
`

const GameUiTurnPhaseSequence = () => {
  const currentPhase = useRoborallyState(getCurrentPhase)
  const currentSequence = useRoborallyState(getCurrentSequence)
  const turnPhases = useTurnPhases()

  return (
    <Container>
      {isResolving(currentPhase) && (
        <SequenceContainer>Sequence {currentSequence + 1}</SequenceContainer>
      )}
      {turnPhases.map(phase => (
        <GameUiTurnPhase
          key={phase}
          isCurrent={phase === currentPhase}
          phase={phase}
        />
      ))}
    </Container>
  )
}

export default GameUiTurnPhaseSequence
