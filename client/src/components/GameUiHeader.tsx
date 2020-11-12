import React from "react"
import { RoomId } from "common/model/RoomData"

type GameUiHeaderProps = {
  currentTurn: number
  roomId: RoomId
}

const GameUiHeader = ({ currentTurn, roomId }: GameUiHeaderProps) => (
  <div id="GameUiHeader">
    <p>
      ROOM {roomId} - TURN {currentTurn}
    </p>
  </div>
)

export default GameUiHeader
