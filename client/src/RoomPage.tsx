import React, { FC } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useFirestore, isError, isPending, isLoaded } from './utils/firestore'

type RouteParams = {
  room_id: string
}

const RoomPage: FC = () => {
  const {params: {room_id}} = useRouteMatch<RouteParams>()
  const room_data = useFirestore('room', room_id)
  const game_data = useFirestore('game', room_id)

  if (isError(room_data)) {
    return <div>Invalid room ID</div>
  }

  if (isPending(room_data)) {
    return <div>Pending...</div>
  }

  if (isLoaded(game_data)) {
    return <div>Game {room_id}</div>
  } else {
    return <div>Room {room_id}</div>
  }
}

export default RoomPage
