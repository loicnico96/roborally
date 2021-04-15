import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { RoomData, RoomId } from "common/model/RoomData"
import Box from "components/ui/Box"
import { useTranslations, TranslationConfig } from "hooks/useTranslations"
import { ROUTES } from "utils/navigation"

export type RoomListItemProps = {
  roomId: RoomId
  room: RoomData
}

function formatRoomOptions(t: TranslationConfig, room: RoomData): string[] {
  switch (room.game) {
    case GameType.ROBORALLY: {
      const { options } = room as RoomData<GameType.ROBORALLY>
      const boardNames = options.boardIds
        .map(boardId => t.roborally.board[boardId])
        .join(", ")

      return [t.roborally.options.boards({ boardNames })]
    }

    default:
      return []
  }
}

function formatRoomInfo(t: TranslationConfig, room: RoomData): string {
  const gameType = t.games[room.game].name
  const roomStatus = t.room.status[room.status]

  const playerNames = room.playerOrder
    .map(playerId => room.players[playerId].name)
    .join(", ")

  return [
    t.room.roomTitle({ gameType, roomStatus }).toUpperCase(),
    ...formatRoomOptions(t, room),
    t.room.players({ playerNames }),
  ].join("\n")
}

const RoomListItemContainer = styled(Box)`
  margin-bottom: 24px;
  white-space: pre-line;
`

const RoomListItem = ({ roomId, room }: RoomListItemProps) => {
  const t = useTranslations()

  return (
    <Link to={ROUTES.room(roomId)}>
      <RoomListItemContainer>{formatRoomInfo(t, room)}</RoomListItemContainer>
    </Link>
  )
}

export default RoomListItem
