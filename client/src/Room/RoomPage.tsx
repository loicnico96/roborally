import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useFirestore } from '../utils/firestore'
import { GameData } from '../common/GameData'
import { RoomData } from '../common/RoomData'
import GamePage from '../Game/GamePage'

type RouteParams = {
  roomId: string
}

const RoomPage: FC = () => {
  const { roomId } = useParams<RouteParams>()
  const room = useFirestore<RoomData>('room', roomId)
  const game = useFirestore<GameData>('game', roomId)

  switch (room.status) {
    case 'pending':
      return <div>Loading room...</div>
    case 'error':
      return <div>Invalid room ID</div>
    case 'done':
      switch (game.status) {
        case 'done':
          return <GamePage gameId={roomId} gameData={game.data} />
        default:
          return <div>Room {roomId}</div>
      }
  }
}

export default RoomPage
