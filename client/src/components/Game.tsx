import React from "react"
import { GameState } from "common/model/GameState"
import { RoomId } from "common/model/RoomData"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import { BoardData } from "common/model/BoardData"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { triggerReady } from "functions/triggers"

type GameProps = {
  boardData: BoardData
  gameState: GameState
  roomId: RoomId
}

const Game = ({ gameState, roomId }: GameProps) => {
  const userId = useCurrentUserId()
  const { phase, turn } = gameState

  const [onReady, onReadyLoading] = useAsyncHandler(async () =>
    triggerReady({
      gameId: roomId,
      playerId: userId,
      program: [1, 2, 3, 4, 5],
      poweredDown: false,
      phase,
      turn,
    })
  )

  if (userId in gameState.players) {
    const { pos, ready } = gameState.players[userId]
    return (
      <div>
        <p>
          Room {roomId} - Turn {turn} - Phase {phase}
        </p>
        <p>
          User {userId} - Player - Position: ({pos.x}-{pos.y})
        </p>
        <p>Ready {ready ? "true" : "false"}</p>
        <button onClick={onReady} disabled={ready || onReadyLoading}>
          Ready
        </button>
      </div>
    )
  }

  return (
    <div>
      <p>
        Room {roomId} - Turn {turn} - Phase {phase}
      </p>
      <p>User {userId} - Spectator</p>
    </div>
  )
}

export default Game
