import React from "react"
import styled from "styled-components"

import { RoomId } from "common/model/RoomData"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"
import { useAuthContext } from "firestore/auth/AuthContext"

import GameUiBoard from "./GameUiBoard"
import GameUiCheckpoint from "./GameUiCheckpoint"
import GameUiHeader from "./GameUiHeader"
import GameUiPlayerCard from "./GameUiPlayerCard"
import GameUiPlayerRobot from "./GameUiPlayerRobot"
import GameUiProgram from "./GameUiProgram"
import GameUiTurnPhase from "./GameUiTurnPhase"
import GameUiViewport from "./GameUiViewport"

type GameProps = {
  gameState: RoborallyState
  roomId: RoomId
}

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
  GamePhase.RESOLVE_PLAYERS,
  GamePhase.RESOLVE_CONVEYORS_FAST,
  GamePhase.RESOLVE_CONVEYORS,
  GamePhase.RESOLVE_CRUSHERS,
  GamePhase.RESOLVE_GEARS,
  GamePhase.RESOLVE_LASERS,
  GamePhase.RESOLVE_CHECKPOINTS,
]

const Game = ({ gameState, roomId }: GameProps) => {
  const { userId } = useAuthContext()

  const isResolving = ![GamePhase.PROGRAM, GamePhase.STANDBY].includes(
    gameState.phase
  )

  return (
    <GameUiContentWrapper>
      <GameUiHeader currentTurn={gameState.turn} roomId={roomId} />
      <GameUiContentMain>
        <GameUiTurnPhaseSequence>
          {isResolving && <p>Sequence {gameState.sequence + 1}</p>}
          {TURN_PHASES.map(phase => (
            <GameUiTurnPhase
              key={phase}
              isCurrent={phase === gameState.phase}
              phase={phase}
            />
          ))}
        </GameUiTurnPhaseSequence>
        <GameUiViewport>
          <GameUiBoard boardId={gameState.boardId} board={gameState.board}>
            {gameState.checkpoints.map((checkpoint, index) => (
              <GameUiCheckpoint key={index} index={index} pos={checkpoint} />
            ))}
            {gameState.playerOrder.map((playerId, index) => (
              <GameUiPlayerRobot
                key={playerId}
                player={gameState.players[playerId]}
                playerIndex={index}
              />
            ))}
          </GameUiBoard>
        </GameUiViewport>
        <div id="GameUiContentMainRight">
          {gameState.playerOrder.map((playerId, index) => (
            <GameUiPlayerCard
              key={playerId}
              isCurrentUser={playerId === userId}
              playerId={playerId}
              playerIndex={index}
              player={gameState.players[playerId]}
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

export default Game
