import React, { FC } from 'react'
import { useRouteMatch } from 'react-router-dom'

const RoomPage: FC = () => {
  const {params: {room_id}} = useRouteMatch<{room_id: string}>()
  return <div>{room_id}</div>
}

export default RoomPage
