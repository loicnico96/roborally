import React, { FC } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useFirestore } from './utils/firestore'
import { GameData } from './common/GameData'
import GamePage from './Game/GamePage'

type RouteParams = {
  room_id: string
}

const Room: FC = () => {
  const {
    params: { room_id },
  } = useRouteMatch<RouteParams>()
  const room = useFirestore('room', room_id)
  const game = useFirestore<GameData>('game', room_id)

  switch (room.status) {
    case 'pending':
      return <div>Loading room...</div>
    case 'error':
      return <div>Invalid room ID</div>
    case 'done':
      switch (game.status) {
        case 'done':
          return <GamePage game_id={room_id} game_data={game.data} />
        default:
          return <div>Room {room_id}</div>
      }
  }
}

export default Room
