import React from "react"
import styled from "styled-components"

import { UserInfo } from "common/model/UserInfo"

export type RoomListItemProps = {
  isRoomOwner: boolean
  userInfo: UserInfo
}

const RoomPlayerItemContainer = styled.div`
  background-color: #ccc;
  border: 8px solid #aaa;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin: 24px 0px;
  padding: 16px 24px;
  white-space: pre-line;
`

const RoomPlayerItem = ({ isRoomOwner, userInfo }: RoomListItemProps) => (
  <RoomPlayerItemContainer>
    {isRoomOwner ? `${userInfo.name} (owner)` : userInfo.name}
  </RoomPlayerItemContainer>
)

export default RoomPlayerItem
