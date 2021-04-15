import React, { useCallback } from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomId } from "common/model/RoomData"
import Box from "components/ui/Box"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"

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

function usePlayerName(roomId: RoomId, playerId: PlayerId): string {
  return useRoomData(
    roomId,
    useCallback(room => room.players[playerId].name, [playerId])
  )
}

const RoomPlayerItem = ({ playerId }: RoomListItemProps) => {
  const roomId = useRoomId()
  const ownerId = useRoomData(roomId, getOwnerId)
  const playerName = usePlayerName(roomId, playerId)
  const t = useTranslations()
  return (
    <RoomPlayerItemContainer>
      {ownerId === playerId ? t.room.owner({ playerName }) : playerName}
    </RoomPlayerItemContainer>
  )
}

export default RoomPlayerItem
