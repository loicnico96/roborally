import update from "immutability-helper"
import React, { useCallback } from "react"
import styled from "styled-components"

import { BoardId, getMaxCheckpoints } from "common/roborally/model/BoardData"
import { RoborallyOptions } from "common/roborally/RoborallySettings"
import { clamp, range } from "common/utils/math"
import { getBoardImage } from "components/roborally/BoardImage"
import Box from "components/ui/Box"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { SelectEvent } from "utils/dom"

import BoardSelector from "./BoardSelector"
import { useChangeRoomOptions } from "./hooks/useChangeRoomOptions"
import { getGameType, getRoborallyOptions } from "./utils/getters"
import { GameType } from "common/GameSettings"

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

const RoomOptionsBoardImageContainer = styled.div`
  height: 600px;
  width: 600px;
`

type RoomOptionsBoardImageProps = {
  rowCount: number
}

const RoomOptionsBoardImage = styled.img`
  width: calc(100% / ${({ rowCount }: RoomOptionsBoardImageProps) => rowCount});
`

function checkCheckpoints(options: RoborallyOptions): RoborallyOptions {
  const maxCheckpoints = getMaxCheckpoints(options.boardIds)
  return update(options, {
    checkpoints: checkpoints => clamp(checkpoints, 1, maxCheckpoints),
  })
}

const RoomOptionsRoborally = () => {
  const roomId = useRoomId()
  const options = useRoomData(roomId, getRoborallyOptions)
  const [changeOptions, isEnabled] = useChangeRoomOptions(roomId)
  const [changeOptionsSafe, isChanging] = useAsyncHandler(changeOptions)

  const onAddBoardId = useCallback(
    (boardId: BoardId) => {
      changeOptionsSafe(
        checkCheckpoints(
          update(options, {
            boardIds: {
              $push: [boardId],
            },
          })
        )
      )
    },
    [changeOptionsSafe, options]
  )

  const onChangeBoardId = useCallback(
    (boardId: BoardId, index: number) => {
      changeOptionsSafe(
        checkCheckpoints(
          update(options, {
            boardIds: {
              [index]: {
                $set: boardId,
              },
            },
          })
        )
      )
    },
    [changeOptionsSafe, options]
  )

  const onRemoveBoardId = useCallback(
    (index: number) => {
      changeOptionsSafe(
        checkCheckpoints(
          update(options, {
            boardIds: {
              $splice: [[index, 1]],
            },
          })
        )
      )
    },
    [changeOptionsSafe, options]
  )

  const onChangeCheckpoints = useCallback(
    (event: SelectEvent) => {
      const checkpoints = Number.parseInt(event.target.value, 10)
      changeOptionsSafe(
        checkCheckpoints(
          update(options, {
            checkpoints: {
              $set: checkpoints,
            },
          })
        )
      )
    },
    [changeOptionsSafe, options]
  )

  const { checkpoints, boardIds } = options

  const boardCount = boardIds.length
  const boardCountX = Math.ceil(Math.sqrt(boardCount))
  const isCanAddBoard = boardCount < 4
  const isCanRemoveBoard = boardCount > 1
  const isChangeDisabled = isChanging || !isEnabled
  const maxCheckpoints = getMaxCheckpoints(boardIds)

  return (
    <RoomOptionsContainer>
      <RoomOptionsTitle>Options</RoomOptionsTitle>
      {boardIds.map((boardId, index) => (
        <RoomOptionsRow key={`select-board-${index}`}>
          <RoomOptionsRowLabel>Board {index + 1}:</RoomOptionsRowLabel>
          <BoardSelector
            isChangeDisabled={isChangeDisabled}
            isRemoveDisabled={isChangeDisabled || !isCanRemoveBoard}
            onChange={value => onChangeBoardId(value, index)}
            onRemove={() => onRemoveBoardId(index)}
            value={boardId}
          />
        </RoomOptionsRow>
      ))}
      {isCanAddBoard && isEnabled && (
        <RoomOptionsRow key={`select-board-${boardCount}`}>
          <RoomOptionsRowLabel>Board {boardCount + 1}:</RoomOptionsRowLabel>
          <BoardSelector
            isChangeDisabled={isChangeDisabled}
            onChange={onAddBoardId}
            value={null}
          />
        </RoomOptionsRow>
      )}
      <RoomOptionsRow>
        <RoomOptionsRowLabel>Checkpoints:</RoomOptionsRowLabel>
        <select
          disabled={isChangeDisabled}
          onChange={onChangeCheckpoints}
          value={checkpoints}
        >
          {range(1, maxCheckpoints + 1).map(count => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </RoomOptionsRow>
      <RoomOptionsBoardImageContainer>
        {boardIds.map((boardId, index) => (
          <RoomOptionsBoardImage
            key={index}
            rowCount={boardCountX}
            src={getBoardImage(boardId)}
            title={`Board ${index + 1}`}
          />
        ))}
      </RoomOptionsBoardImageContainer>
    </RoomOptionsContainer>
  )
}

const RoomOptions = () => {
  const roomId = useRoomId()
  const gameType = useRoomData(roomId, getGameType)

  switch (gameType) {
    case GameType.ROBORALLY:
      return <RoomOptionsRoborally />
    default:
      return null
  }
}

export default RoomOptions
