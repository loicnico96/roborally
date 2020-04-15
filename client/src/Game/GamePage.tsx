import React, { FC } from 'react'
import { useFirestore } from '../utils/firestore'
import { GameData } from './GameData'

type GamePageProps = {
  game_id: string
  game_data: GameData
}

const GamePage: FC<GamePageProps> = ({ game_id, game_data }) => {
  const board = useFirestore('board', game_data.board_id)

  switch (board.status) {
    case 'pending':
      return <div>Loading board...</div>
    case 'error':
      return <div>Invalid board ID</div>
    case 'done':
      return <div>Game page {game_id}</div>
  }
}

export default GamePage
