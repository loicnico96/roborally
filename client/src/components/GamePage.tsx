import React, { useState } from "react"
import { GameState } from "common/model/GameState"
import { RoomId } from "common/model/RoomData"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import { isError, isLoading, Resource } from "utils/resources"
import { BoardData } from "common/model/BoardData"
import { Collection } from "common/firestore/collections"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"

type GamePageProps = {
  roomId: RoomId
  gameState: GameState
}

const GamePage = ({ roomId, gameState }: GamePageProps) => {
  const userId = useCurrentUserId()
  const { boardId, phase, turn } = gameState

  const [boardResource, setBoardResource] = useState<Resource<
  BoardData
  > | null>(null)

  useFirestoreLoader(Collection.BOARD, boardId, setBoardResource)

  if (boardResource === null || isLoading(boardResource)) {
    return <div>Loading board...</div>
  }

  if (isError(boardResource)) {
    return <div>Invalid board ID</div>
  }

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

export default GamePage
