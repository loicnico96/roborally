import React from "react"
import { useParams } from "react-router-dom"

type RouteParams = {
  roomId: string
}

const RoomPage = () => {
  const { roomId } = useParams<RouteParams>()

  return <div>Room {roomId}</div>
}

export default RoomPage
