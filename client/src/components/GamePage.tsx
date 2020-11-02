import React, { useState } from "react"
import { GameState } from "common/model/GameState"
import { RoomId } from "common/model/RoomData"
import { isError, isLoading, Resource } from "utils/resources"
import { BoardData } from "common/model/BoardData"
import { Collection } from "common/firestore/collections"
import { useFirestoreLoader } from "firestore/useFirestoreLoader"
import Game from "./Game"

type GamePageProps = {
  roomId: RoomId
  gameState: GameState
}

const GamePage = ({ roomId, gameState }: GamePageProps) => {
  const { boardId } = gameState

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

  return (
    <Game
      boardData={boardResource.data}
      gameState={gameState}
      roomId={roomId}
    />
  )
}

export default GamePage
