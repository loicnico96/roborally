import React from "react"

import {
  BoardCategory,
  BoardId,
  getBoardCategory,
} from "common/roborally/model/BoardData"
import { sortByAlpha } from "common/utils/arrays"
import { randomEnumValue } from "common/utils/enums"
import { validateEnum } from "common/utils/validation"
import { TranslationConfig, useTranslations } from "hooks/useTranslations"
import { SelectEvent } from "utils/dom"

export type BoardSelectorProps = {
  isChangeDisabled?: boolean
  isRemoveDisabled?: boolean
  onChange: (boardId: BoardId) => void
  onRemove?: () => void
  value: BoardId | null
}

const SELECT_NONE = "none"

const BOARD_CATEGORY_ORDER: BoardCategory[] = [
  BoardCategory.ORIGINAL,
  BoardCategory.ARMED_AND_DANGEROUS,
  BoardCategory.CRASH_AND_BURN,
  BoardCategory.CUSTOM,
]

function getBoardsInCategory(
  category: BoardCategory,
  t: TranslationConfig
): BoardId[] {
  const boardIds = Object.values(BoardId).filter(
    boardId => getBoardCategory(boardId) === category
  )

  return sortByAlpha(boardIds, boardId => t.roborally.board[boardId])
}

const BoardSelector = ({
  isChangeDisabled = false,
  isRemoveDisabled = false,
  onChange,
  onRemove,
  value,
}: BoardSelectorProps) => {
  const t = useTranslations()

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
            {t.roborally.options.board.add.label}
          </option>
        )}
        {BOARD_CATEGORY_ORDER.map(category => (
          <optgroup key={category} label={t.roborally.boardCategory[category]}>
            {getBoardsInCategory(category, t).map(boardId => (
              <option key={boardId} value={boardId}>
                {t.roborally.board[boardId]}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <button
        disabled={isChangeDisabled}
        onClick={onSelectBoardIdRandom}
        title={t.roborally.options.board.random.tooltip}
      >
        {t.roborally.options.board.random.label}
      </button>
      {onRemove !== undefined && (
        <button
          disabled={isRemoveDisabled}
          onClick={onRemove}
          title={t.roborally.options.board.remove.tooltip}
        >
          {t.roborally.options.board.remove.label}
        </button>
      )}
    </div>
  )
}

export default BoardSelector
