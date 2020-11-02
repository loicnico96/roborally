import React from "react"
import { useParams } from "react-router-dom"
import { useCurrentPlayerId } from "hooks/useCurrentPlayerId"

type RouteParams = {
  roomId: string
}

const RoomPage = () => {
  const { roomId } = useParams<RouteParams>()
  const playerId = useCurrentPlayerId()

  return (
    <div>
      Room {roomId} - Player {playerId}
    </div>
  )
}

export default RoomPage
