import React from "react"
import styled from "styled-components"

import { FeatureType } from "common/roborally/model/BoardData"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"
import { useGameState } from "components/room/GameContext"
import { useRoomData, useRoomId } from "components/room/RoomContext"
import { useAuthContext } from "firestore/auth/AuthContext"

import GameUiBoard from "./GameUiBoard"
import GameUiCheckpoint from "./GameUiCheckpoint"
import GameUiHeader from "./GameUiHeader"
import GameUiPlayerCard from "./GameUiPlayerCard"
import GameUiPlayerRobot from "./GameUiPlayerRobot"
import GameUiProgram from "./GameUiProgram"
import GameUiTurnPhase from "./GameUiTurnPhase"
import GameUiViewport from "./GameUiViewport"
import { getViewportHeight, getViewportWidth } from "./Viewport"

const GameUiContentWrapper = styled.div`
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const GameUiContentMain = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  overflow: hidden;
`

const GameUiTurnPhaseSequence = styled.div`
  width: 200px;
`

const TURN_PHASES = [
  GamePhase.STANDBY,
  GamePhase.PROGRAM,
  GamePhase.RESOLVE_RANDOMIZERS,
  GamePhase.RESOLVE_PLAYERS,
  GamePhase.RESOLVE_CONVEYORS_FAST,
  GamePhase.RESOLVE_CONVEYORS,
  GamePhase.RESOLVE_PUSHERS,
  GamePhase.RESOLVE_CRUSHERS,
  GamePhase.RESOLVE_GEARS,
  GamePhase.RESOLVE_LASERS,
  GamePhase.RESOLVE_CHECKPOINTS,
]

function isPhaseAvailable(phase: GamePhase, state: RoborallyState): boolean {
  switch (phase) {
    case GamePhase.RESOLVE_RANDOMIZERS:
      return state.board.features.includes(FeatureType.RANDOM)
    case GamePhase.RESOLVE_CONVEYORS_FAST:
      return state.board.features.includes(FeatureType.CONVEYOR_FAST)
    case GamePhase.RESOLVE_CONVEYORS:
      return state.board.features.includes(FeatureType.CONVEYOR)
    case GamePhase.RESOLVE_PUSHERS:
      return state.board.features.includes(FeatureType.PUSHER)
    case GamePhase.RESOLVE_CRUSHERS:
      return state.board.features.includes(FeatureType.CRUSHER)
    case GamePhase.RESOLVE_GEARS:
      return state.board.features.includes(FeatureType.GEAR)
    default:
      return true
  }
}

function getTurnPhases(state: RoborallyState): GamePhase[] {
  return TURN_PHASES.filter(phase => isPhaseAvailable(phase, state))
}

const GamePage = () => {
  const roomId = useRoomId()
  const roomData = useRoomData()
  const gameState = useGameState()
  const { userId } = useAuthContext()

  const isResolving = ![GamePhase.PROGRAM, GamePhase.STANDBY].includes(
    gameState.phase
  )

  return (
    <GameUiContentWrapper>
      <GameUiHeader currentTurn={gameState.turn} />
      <GameUiContentMain>
        <GameUiTurnPhaseSequence>
          {isResolving && <p>Sequence {gameState.sequence + 1}</p>}
          {getTurnPhases(gameState).map(phase => (
            <GameUiTurnPhase
              key={phase}
              isCurrent={phase === gameState.phase}
              phase={phase}
            />
          ))}
        </GameUiTurnPhaseSequence>
        <GameUiViewport
          viewportHeight={getViewportHeight(gameState)}
          viewportWidth={getViewportWidth(gameState)}
        >
          <GameUiBoard />
          {gameState.checkpoints.map((checkpoint, index) => (
            <GameUiCheckpoint key={index} index={index} pos={checkpoint} />
          ))}
          {gameState.playerOrder.map((playerId, index) => (
            <GameUiPlayerRobot
              key={playerId}
              player={gameState.players[playerId]}
              playerName={roomData.players[playerId].name}
              playerIndex={index}
            />
          ))}
        </GameUiViewport>
        <div id="GameUiContentMainRight">
          {gameState.playerOrder.map((playerId, index) => (
            <GameUiPlayerCard
              key={playerId}
              isCurrentUser={playerId === userId}
              playerId={playerId}
              playerIndex={index}
            />
          ))}
        </div>
      </GameUiContentMain>
      {userId !== null && userId in gameState.players && (
        <GameUiProgram
          gameState={gameState}
          playerId={userId}
          roomId={roomId}
        />
      )}
    </GameUiContentWrapper>
  )
}

export default GamePage
