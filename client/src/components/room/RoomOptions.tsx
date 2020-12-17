import React, { useCallback } from "react"
import styled from "styled-components"

import { BoardId } from "common/roborally/model/BoardData"
import { validateEnum } from "common/utils/validation"
import { getBoardImage } from "components/roborally/BoardImage"
import Box from "components/ui/Box"
import { useChangeRoomOptions } from "hooks/room/useChangeRoomOptions"

import { useRoomData, useRoomId } from "./RoomContext"

function getBoardName(boardId: BoardId): string {
  return {
    [BoardId.CANNERY_ROW]: "Cannery Row",
    [BoardId.CHESS]: "Chess",
    [BoardId.CHOP_SHOP]: "Chop Shop",
    [BoardId.CIRCUIT_TRAP]: "Circuit Trap",
    [BoardId.CROSS]: "Cross",
    [BoardId.EXCHANGE]: "Exchange",
    [BoardId.FLOOD_ZONE]: "Flood Zone",
    [BoardId.ISLAND]: "Island",
    [BoardId.LASER_MAZE]: "Laser Maze",
    [BoardId.MAELSTROM]: "Maelstrom",
    [BoardId.PIT_MAZE]: "Pit Maze",
    [BoardId.SPIN_ZONE]: "Spin Zone",
    [BoardId.VAULT]: "Vault",
  }[boardId]
}

const RoomOptionsContainer = styled(Box)`
  flex: 1 1 auto;
  white-space: pre-line;
`

const RoomOptionsTitle = styled.div`
  margin-bottom: 8px;
`

const RoomOptionsRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`

const RoomOptionsRowLabel = styled.div`
  margin-right: 4px;
`

const RoomOptionsBoardImage = styled.img`
  width: 600px;
`

type SelectEvent = React.ChangeEvent<HTMLSelectElement>

const RoomOptions = () => {
  const roomId = useRoomId()
  const roomData = useRoomData()
  const [changeOptions, isEnabled] = useChangeRoomOptions(roomId, roomData)

  const { options } = roomData

  const onSelectBoardId = useCallback(
    async (event: SelectEvent) => {
      try {
        const boardId = validateEnum(BoardId)(event.target.value)
        if (boardId !== options.boardId) {
          await changeOptions({ boardId })
        }
      } catch (error) {
        console.error(error)
      }
    },
    [changeOptions, options]
  )

  return (
    <RoomOptionsContainer>
      <RoomOptionsTitle>Options</RoomOptionsTitle>
      <RoomOptionsRow>
        <RoomOptionsRowLabel>Board:</RoomOptionsRowLabel>
        <select
          defaultValue={options.boardId}
          disabled={!isEnabled}
          onChange={onSelectBoardId}
          value={isEnabled ? undefined : options.boardId}
        >
          {Object.values(BoardId).map(boardId => (
            <option key={boardId} value={boardId}>
              {getBoardName(boardId)}
            </option>
          ))}
        </select>
      </RoomOptionsRow>
      <RoomOptionsBoardImage
        src={getBoardImage(options.boardId)}
        title="Preview"
      />
    </RoomOptionsContainer>
  )
}

export default RoomOptions
