import React from "react"
import styled from "styled-components"
import { GamePhase, GameState } from "common/model/GameState"
import { RoomId } from "common/model/RoomData"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import GameUiHeader from "./GameUiHeader"
import GameUiTurnPhase from "./GameUiTurnPhase"
import GameUiPlayerCard from "./GameUiPlayerCard"
import GameUiProgram from "./GameUiProgram"

import boardBackground from "../assets/Boards/Base Game/Island.png"

type GameProps = {
  gameState: GameState
  roomId: RoomId
}

const GameUiContentWrapper = styled.div`
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

const GameUiBoardWrapper = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  overflow: auto;
`

const GameUiBoardBackground = styled.div`
  background-image: url(${boardBackground});
  background-repeat: no-repeat;
  background-size: 1200px;
  height: 1200px;
  width: 1200px;
`

const TURN_PHASES = [
  GamePhase.STANDBY,
  GamePhase.PROGRAM,
  GamePhase.RESOLVE_PLAYERS,
  GamePhase.RESOLVE_CONVEYORS_FAST,
  GamePhase.RESOLVE_CONVEYORS,
  GamePhase.RESOLVE_GEARS,
  GamePhase.RESOLVE_LASERS,
  GamePhase.RESOLVE_CHECKPOINTS,
]

const Game = ({ gameState, roomId }: GameProps) => {
  const userId = useCurrentUserId()

  const isPlayer = userId in gameState.players

  return (
    <GameUiContentWrapper id="GameUi">
      <GameUiHeader currentTurn={gameState.turn} roomId={roomId} />
      <GameUiContentMain id="GameUiContentMain">
        <div id="GameUiTurnPhaseSequence">
          {TURN_PHASES.map(phase => (
            <GameUiTurnPhase
              key={phase}
              isCurrent={phase === gameState.phase}
              sequence={gameState.sequence + 1}
              phase={phase}
            />
          ))}
        </div>
        <GameUiBoardWrapper id="GameUiBoard">
          <GameUiBoardBackground />
        </GameUiBoardWrapper>
        <div id="GameUiContentMainRight">
          {gameState.playerOrder.map(playerId => (
            <GameUiPlayerCard
              key={playerId}
              isCurrentUser={playerId === userId}
              player={gameState.players[playerId]}
              playerId={playerId}
            />
          ))}
        </div>
      </GameUiContentMain>
      {isPlayer && (
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
