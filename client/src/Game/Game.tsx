import React, { FC } from 'react'
import { BoardData } from '../common/BoardData'
import { GameData } from '../common/GameData'
import Board from './Board'

type GameProps = {
  boardId: string
  boardData: BoardData
  gameId: string
  gameData: GameData
}

const Game: FC<GameProps> = ({ boardId, boardData, gameId }) => {
  return (
    <div>
      <div>
        Game page {gameId} {boardId}
      </div>
      <Board board_data={boardData} />
    </div>
  )
}

export default Game
