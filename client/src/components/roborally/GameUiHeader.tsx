import React from "react"

import { RoomId } from "common/model/RoomData"
import PageHeader from "components/PageHeader"

type GameUiHeaderProps = {
  currentTurn: number
  roomId: RoomId
}

const GameUiHeader = ({ currentTurn, roomId }: GameUiHeaderProps) => (
  <PageHeader title={`ROOM ${roomId} - TURN ${currentTurn}`} />
)

export default GameUiHeader
