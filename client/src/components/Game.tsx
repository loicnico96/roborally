import React from "react"
import { GamePhase, GameState } from "common/model/GameState"
import { RoomId } from "common/model/RoomData"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import { BoardData } from "common/model/BoardData"
import GameUiHeader from "./GameUiHeader"
import GameUiTurnPhase from "./GameUiTurnPhase"
import GameUiPlayerCard from "./GameUiPlayerCard"
import GameUiProgram from "./GameUiProgram"

type GameProps = {
  boardData: BoardData
  gameState: GameState
  roomId: RoomId
}

const TURN_PHASES = [GamePhase.STANDBY, GamePhase.PROGRAM, GamePhase.RESOLVE]

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
              phase={phase}
            />
          ))}
        </div>
        <div id="GameUiBoard">
          <p>Board</p>
        </div>
        <div id="GameUiContentMainRight">
          {Object.keys(gameState.players).map(playerId => (
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