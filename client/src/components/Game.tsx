import React from "react"
import { GamePhase, GameState } from "common/model/GameState"
import { RoomId } from "common/model/RoomData"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import GameUiHeader from "./GameUiHeader"
import GameUiTurnPhase from "./GameUiTurnPhase"
import GameUiPlayerCard from "./GameUiPlayerCard"
import GameUiProgram from "./GameUiProgram"

type GameProps = {
  gameState: GameState
  roomId: RoomId
}

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
    <div id="GameUi">
      <GameUiHeader currentTurn={gameState.turn} roomId={roomId} />
      <div id="GameUiContentMain">
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
        <div id="GameUiBoard">
          <p>Board</p>
        </div>
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
      </div>
      {isPlayer && (
        <GameUiProgram
          gameState={gameState}
          playerId={userId}
          roomId={roomId}
        />
      )}
    </div>
  )
}

export default Game
