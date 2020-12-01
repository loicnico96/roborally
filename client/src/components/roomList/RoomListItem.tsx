import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { RoomData, RoomId } from "common/model/RoomData"
import { useTrans } from "hooks/useTrans"
import { ROUTES } from "utils/navigation"

export type RoomListItemProps = {
  roomId: RoomId
  room: RoomData
}

function useRoomInfoFormat(room: RoomData): string {
  const t = useTrans("RoomListPage")

  const playerNames = room.playerOrder.map(
    playerId => room.players[playerId].name
  )

  return [
    t("roomTitle", room),
    t("roomOptions", room.options),
    t("roomPlayers", playerNames),
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

const RoomListItem = ({ roomId, room }: RoomListItemProps) => {
  const roomInfoFormatted = useRoomInfoFormat(room)
  return (
    <Link to={ROUTES.room(roomId)}>
      <RoomListItemContainer>{roomInfoFormatted}</RoomListItemContainer>
    </Link>
  )
}

export default RoomListItem
