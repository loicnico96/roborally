import React, { FC } from 'react'
import { useFirestore } from '../utils/firestore'
import { BoardData } from '../common/BoardData'
import { GameData } from '../common/GameData'
import Game from './Game'

type GamePageProps = {
  gameId: string
  gameData: GameData
}

const GamePage: FC<GamePageProps> = ({ gameId, gameData }) => {
  const { boardId } = gameData
  const board = useFirestore<BoardData>('board', boardId)

  switch (board.status) {
    case 'pending':
      return <div>Loading board...</div>
    case 'error':
      return <div>Invalid board ID</div>
    case 'done':
      return (
        <Game
          boardId={boardId}
          boardData={board.data}
          gameId={gameId}
          gameData={gameData}
        />
      )
  }
}

export default GamePage
