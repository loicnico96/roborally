import React, { useCallback } from "react"
import styled from "styled-components"

import { BoardId } from "common/roborally/model/BoardData"
import { validateEnum } from "common/utils/validation"
import { getBoardImage } from "components/roborally/BoardImage"
import { useChangeRoomOptions } from "hooks/room/useChangeRoomOptions"

import { useRoomData, useRoomId } from "./RoomContext"

function getBoardName(boardId: BoardId): string {
  return {
    [BoardId.CROSS]: "Cross",
    [BoardId.EXCHANGE]: "Exchange",
    [BoardId.FLOOD_ZONE]: "Flood Zone",
    [BoardId.ISLAND]: "Island",
  }[boardId]
}

const RoomOptionsContainer = styled.div`
  background-color: #ccc;
  border: 8px solid #aaa;
  border-radius: 16px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin: 24px 0px;
  padding: 16px 24px;
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

type RoomOptionsBoardImageProps = {
  boardId: BoardId
}

function getBackgroundUrl({ boardId }: RoomOptionsBoardImageProps): string {
  return getBoardImage(boardId)
}

const RoomOptionsBoardImage = styled.div`
  background-image: url("${getBackgroundUrl}");
  background-repeat: no-repeat;
  background-size: contain;
  flex: 1 1 auto;
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
      <RoomOptionsBoardImage boardId={options.boardId} title="Preview" />
    </RoomOptionsContainer>
  )
}

export default RoomOptions
