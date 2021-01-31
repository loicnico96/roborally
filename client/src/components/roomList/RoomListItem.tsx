import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { RoomData, RoomId, RoomStatus } from "common/model/RoomData"
import { BoardId } from "common/roborally/model/BoardData"
import Box from "components/ui/Box"
import { ROUTES } from "utils/navigation"

export type RoomListItemProps = {
  roomId: RoomId
  room: RoomData
}

function formatRoomOptions(room: RoomData): string {
  switch (room.game) {
    case GameType.ROBORALLY: {
      const { options } = room as RoomData<GameType.ROBORALLY>
      const boardNames = options.boardIds.map(
        boardId =>
          ({
            [BoardId.ARKHAM_ASYLUM]: "Arkham Asylum",
            [BoardId.BLAST_FURNACE]: "Blast Furnace",
            [BoardId.CANNERY_ROW]: "Cannery Row",
            [BoardId.CHASM]: "Chasm",
            [BoardId.CHESS]: "Chess",
            [BoardId.CHOP_SHOP]: "Chop Shop",
            [BoardId.CIRCUIT_TRAP]: "Circuit Trap",
            [BoardId.CROSS]: "Cross",
            [BoardId.EXCHANGE]: "Exchange",
            [BoardId.FLOOD_ZONE]: "Flood Zone",
            [BoardId.GEAR_BOX]: "Gear Box",
            [BoardId.ISLAND]: "Island",
            [BoardId.LASER_MAZE]: "Laser Maze",
            [BoardId.MACHINE_SHOP]: "Machine Shop",
            [BoardId.MAELSTROM]: "Maelstrom",
            [BoardId.PIT_MAZE]: "Pit Maze",
            [BoardId.SPIN_ZONE]: "Spin Zone",
            [BoardId.VAULT]: "Vault",
          }[boardId])
      )

      return `Boards: ${boardNames.join(", ")}`
    }

    default:
      return ""
  }
}

function formatRoomInfo(room: RoomData): string {
  const gameName = {
    metropolys: "Metropolys",
    roborally: "Roborally",
  }[room.game]

  const statusName = {
    [RoomStatus.OPENED]: "Open",
    [RoomStatus.ONGOING]: "Ongoing",
    [RoomStatus.FINISHED]: "Finished",
  }[room.status]

  const playerNames = room.playerOrder.map(
    playerId => room.players[playerId].name
  )

  return [
    `${gameName.toUpperCase()} - ${statusName.toUpperCase()}`,
    formatRoomOptions(room),
    `Players: ${playerNames.join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n")
}

const RoomListItemContainer = styled(Box)`
  margin-bottom: 24px;
  white-space: pre-line;
`

const RoomListItem = ({ roomId, room }: RoomListItemProps) => (
  <Link to={ROUTES.room(roomId)}>
    <RoomListItemContainer>{formatRoomInfo(room)}</RoomListItemContainer>
  </Link>
)

export default RoomListItem
