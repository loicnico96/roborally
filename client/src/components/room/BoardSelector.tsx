import React from "react"

import { BoardId } from "common/roborally/model/BoardData"
import { sortByAlpha } from "common/utils/arrays"
import { randomEnumValue } from "common/utils/enums"
import { validateEnum } from "common/utils/validation"
import { SelectEvent } from "utils/dom"

export type BoardSelectorProps = {
  isChangeDisabled?: boolean
  isRemoveDisabled?: boolean
  onChange: (boardId: BoardId) => void
  onRemove?: () => void
  value: BoardId | null
}

enum BoardCategory {
  ORIGINAL = "Original",
  ARMED_AND_DANGEROUS = "ArmedAndDangerous",
  CRASH_AND_BURN = "CrashAndBurn",
  CUSTOM = "Custom",
}

const SELECT_NONE = "none"

const BOARD_CATEGORY_ORDER: BoardCategory[] = [
  BoardCategory.ORIGINAL,
  BoardCategory.ARMED_AND_DANGEROUS,
  BoardCategory.CRASH_AND_BURN,
  BoardCategory.CUSTOM,
]

function getBoardCategoryName(category: BoardCategory): string {
  return {
    [BoardCategory.ORIGINAL]: "Original",
    [BoardCategory.ARMED_AND_DANGEROUS]: "Armed and Dangerous",
    [BoardCategory.CRASH_AND_BURN]: "Crash and Burn",
    [BoardCategory.CUSTOM]: "Custom",
  }[category]
}

function getBoardCategory(boardId: BoardId): BoardCategory {
  return {
    [BoardId.ARKHAM_ASYLUM]: BoardCategory.CUSTOM,
    [BoardId.BLAST_FURNACE]: BoardCategory.CRASH_AND_BURN,
    [BoardId.CANNERY_ROW]: BoardCategory.ORIGINAL,
    [BoardId.CHASM]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.CHESS]: BoardCategory.ORIGINAL,
    [BoardId.CHOP_SHOP]: BoardCategory.ORIGINAL,
    [BoardId.CIRCUIT_TRAP]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.CROSS]: BoardCategory.ORIGINAL,
    [BoardId.EXCHANGE]: BoardCategory.ORIGINAL,
    [BoardId.FLOOD_ZONE]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.GEAR_BOX]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.ISLAND]: BoardCategory.ORIGINAL,
    [BoardId.MACHINE_SHOP]: BoardCategory.CRASH_AND_BURN,
    [BoardId.LASER_MAZE]: BoardCategory.ARMED_AND_DANGEROUS,
    [BoardId.MAELSTROM]: BoardCategory.ORIGINAL,
    [BoardId.PIT_MAZE]: BoardCategory.ORIGINAL,
    [BoardId.SPIN_ZONE]: BoardCategory.ORIGINAL,
    [BoardId.VAULT]: BoardCategory.ORIGINAL,
  }[boardId]
}

function getBoardName(boardId: BoardId): string {
  return {
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
  }[boardId]
}

function getBoardsInCategory(category: BoardCategory): BoardId[] {
  const boardIds = Object.values(BoardId).filter(
    boardId => getBoardCategory(boardId) === category
  )

  return sortByAlpha(boardIds, boardId => getBoardName(boardId))
}

const BoardSelector = ({
  isChangeDisabled = false,
  isRemoveDisabled = false,
  onChange,
  onRemove,
  value,
}: BoardSelectorProps) => {
  function onSelectBoardId(event: SelectEvent) {
    if (event.target.value !== SELECT_NONE) {
      const boardId = validateEnum(BoardId)(event.target.value)
      if (boardId !== value) {
        onChange(boardId)
      }
    }
  }

  function onSelectBoardIdRandom() {
    const boardId = randomEnumValue(BoardId)
    if (boardId !== value) {
      onChange(boardId)
    }
  }

  return (
    <div>
      <select
        disabled={isChangeDisabled}
        onChange={onSelectBoardId}
        value={value ?? SELECT_NONE}
      >
        {value === null && (
          <option key={SELECT_NONE} value={SELECT_NONE}>
            Add a board
          </option>
        )}
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
      {onRemove !== undefined && (
        <button
          disabled={isRemoveDisabled}
          onClick={onRemove}
          title="Remove this board"
        >
          Remove
        </button>
      )}
    </div>
  )
}

export default BoardSelector
