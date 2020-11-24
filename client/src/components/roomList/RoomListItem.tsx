import { RoomData, RoomId } from "common/model/RoomData"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ROUTES } from "utils/navigation"

export type RoomListItemProps = {
  roomId: RoomId
  room: RoomData
}

const RoomListItemContainer = styled.div`
  background-color: #ccc;
  border: 8px solid #aaa;
  border-radius: 16px;
  margin: 24px;
  padding: 16px 24px;
`

const RoomListItem = ({ roomId, room }: RoomListItemProps) => (
  <Link to={ROUTES.room(roomId)}>
    <RoomListItemContainer>
      {roomId} : {JSON.stringify(room)}
    </RoomListItemContainer>
  </Link>
)

export default RoomListItem
