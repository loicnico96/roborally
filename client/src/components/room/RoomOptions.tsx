import React, { useCallback } from "react"
import styled from "styled-components"

import { BoardId } from "common/roborally/model/BoardData"
import { sortByAlpha } from "common/utils/arrays"
import { randomEnumValue } from "common/utils/enums"
import { validateEnum } from "common/utils/validation"
import { getBoardImage } from "components/roborally/BoardImage"
import Box from "components/ui/Box"
import { useChangeRoomOptions } from "hooks/room/useChangeRoomOptions"
import { useAsyncHandler } from "hooks/useAsyncHandler"

import { useRoomData, useRoomId } from "./RoomContext"

enum BoardCategory {
  ORIGINAL = "Original",
  ARMED_AND_DANGEROUS = "ArmedAndDangerous",
}

const BOARD_CATEGORY_ORDER: BoardCategory[] = [
  BoardCategory.ORIGINAL,
  BoardCategory.ARMED_AND_DANGEROUS,
]

function getBoardCategoryName(category: BoardCategory): string {
  return {
    [BoardCategory.ORIGINAL]: "Original",
    [BoardCategory.ARMED_AND_DANGEROUS]: "Armed and Dangerous",
  }[category]
}

function getBoardCategory(boardId: BoardId): BoardCategory {
  return {
    [BoardId.CANNERY_ROW]: BoardCategory.ORIGINAL,
    [BoardId.CHASM]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.CHESS]: BoardCategory.ORIGINAL,
    [BoardId.CHOP_SHOP]: BoardCategory.ORIGINAL,
    [BoardId.CIRCUIT_TRAP]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.CROSS]: BoardCategory.ORIGINAL,
    [BoardId.EXCHANGE]: BoardCategory.ORIGINAL,
    [BoardId.FLOOD_ZONE]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.ISLAND]: BoardCategory.ORIGINAL,
    [BoardId.LASER_MAZE]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.MAELSTROM]: BoardCategory.ORIGINAL,
    [BoardId.PIT_MAZE]: BoardCategory.ORIGINAL,
    [BoardId.SPIN_ZONE]: BoardCategory.ORIGINAL,
    [BoardId.VAULT]: BoardCategory.ORIGINAL,
  }[boardId]
}

function getBoardName(boardId: BoardId): string {
  return {
    [BoardId.CANNERY_ROW]: "Cannery Row",
    [BoardId.CHASM]: "Chasm",
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

function getBoardsInCategory(category: BoardCategory): BoardId[] {
  const boardIds = Object.values(BoardId).filter(
    boardId => getBoardCategory(boardId) === category
  )

  return sortByAlpha(boardIds, boardId => getBoardName(boardId))
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
  const [changeOptionsSafe, isChanging] = useAsyncHandler(changeOptions)

  const { options } = roomData

  const onSelectBoardId = useCallback(
    async (event: SelectEvent) => {
      const boardId = validateEnum(BoardId)(event.target.value)
      if (boardId !== options.boardId) {
        await changeOptionsSafe({ boardId })
      }
    },
    [changeOptionsSafe, options]
  )

  const onSelectBoardIdRandom = useCallback(async () => {
    const boardId = randomEnumValue(BoardId)
    if (boardId !== options.boardId) {
      await changeOptionsSafe({ boardId })
    }
  }, [changeOptionsSafe, options])

  const isChangeDisabled = isChanging || !isEnabled

  return (
    <RoomOptionsContainer>
      <RoomOptionsTitle>Options</RoomOptionsTitle>
      <RoomOptionsRow>
        <RoomOptionsRowLabel>Board:</RoomOptionsRowLabel>
        <select
          disabled={isChangeDisabled}
          onChange={onSelectBoardId}
          value={options.boardId}
        >
          {BOARD_CATEGORY_ORDER.map(category => (
            <optgroup key={category} label={getBoardCategoryName(category)}>
              {getBoardsInCategory(category).map(boardId => (
                <option key={boardId} value={boardId}>
                  {getBoardName(boardId)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          disabled={isChangeDisabled}
          onClick={onSelectBoardIdRandom}
          title="Select a random board"
        >
          Random
        </button>
      </RoomOptionsRow>
      <RoomOptionsBoardImage
        src={getBoardImage(options.boardId)}
        title="Preview"
      />
    </RoomOptionsContainer>
  )
}

export default RoomOptions
