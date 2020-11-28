import { GameType } from "common/GameSettings"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { BoardId } from "common/roborally/model/BoardData"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ROUTES } from "utils/navigation"

export type RoomListItemProps = {
  roomId: RoomId
  room: RoomData
}

function formatRoomInfo(room: RoomData): string {
  const gameName = {
    [GameType.ROBORALLY]: "Roborally",
  }[room.game]

  const statusName = {
    [RoomStatus.OPENED]: "Open",
    [RoomStatus.ONGOING]: "Ongoing",
    [RoomStatus.FINISHED]: "Finished",
  }[room.status]

  const boardName = {
    [BoardId.FLOOD_ZONE]: "Flood Zone",
    [BoardId.ISLAND]: "Island",
  }[room.options.boardId]

  const playerNames = room.playerOrder.map(
    playerId => room.players[playerId].name
  )

  return [
    `${gameName.toUpperCase()} - ${statusName.toUpperCase()}`,
    `Board: ${boardName}`,
    `Players: ${playerNames.join(", ")}`,
  ].join("\n")
}

const RoomListItemContainer = styled.div`
  background-color: #ccc;
  border: 8px solid #aaa;
  border-radius: 16px;
  margin: 24px 0px;
  padding: 16px 24px;
  white-space: pre-line;
`

const RoomListItem = ({ roomId, room }: RoomListItemProps) => (
  <Link to={ROUTES.room(roomId)}>
    <RoomListItemContainer>{formatRoomInfo(room)}</RoomListItemContainer>
  </Link>
)

export default RoomListItem
