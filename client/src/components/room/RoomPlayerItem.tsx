import React from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import Box from "components/ui/Box"
import { usePlayerName } from "hooks/usePlayerName"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"

import { getOwnerId } from "./utils/getters"

export type RoomListItemProps = {
  playerId: PlayerId
}

const RoomPlayerItemContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  white-space: pre-line;
`

const RoomPlayerItem = ({ playerId }: RoomListItemProps) => {
  const roomId = useRoomId()
  const ownerId = useRoomData(roomId, getOwnerId)
  const playerName = usePlayerName(roomId, playerId)
  return (
    <RoomPlayerItemContainer>
      {ownerId === playerId ? `${playerName} (owner)` : playerName}
    </RoomPlayerItemContainer>
  )
}

export default RoomPlayerItem
