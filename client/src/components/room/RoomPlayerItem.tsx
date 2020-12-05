import React from "react"
import styled from "styled-components"

import { UserInfo } from "common/model/UserInfo"
import Box from "components/ui/Box"

export type RoomListItemProps = {
  isRoomOwner: boolean
  userInfo: UserInfo
}

const RoomPlayerItemContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  white-space: pre-line;
`

const RoomPlayerItem = ({ isRoomOwner, userInfo }: RoomListItemProps) => (
  <RoomPlayerItemContainer>
    {isRoomOwner ? `${userInfo.name} (owner)` : userInfo.name}
  </RoomPlayerItemContainer>
)

export default RoomPlayerItem
