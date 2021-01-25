import update from "immutability-helper"
import React, { useCallback } from "react"
import styled from "styled-components"

import { BoardId, getMaxCheckpoints } from "common/roborally/model/BoardData"
import { clamp, range } from "common/utils/math"
import { getBoardImage } from "components/roborally/BoardImage"
import Box from "components/ui/Box"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useRoomId } from "hooks/useRoomId"
import { SelectEvent } from "utils/dom"

import BoardSelector from "./BoardSelector"
import { useChangeRoomOptions } from "./hooks/useChangeRoomOptions"
import { RoborallyOptions } from "common/roborally/model/RoborallyOptions"
import { useRoomOptions } from "hooks/useRoomOptions"
import { GameType } from "common/GameSettings"

const RoborallyOptionsContainer = styled(Box)`
  flex: 1 1 auto;
  white-space: pre-line;
`

const RoborallyOptionsTitle = styled.div`
  margin-bottom: 8px;
`

const RoborallyOptionsRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`

const RoborallyOptionsRowLabel = styled.div`
  margin-right: 4px;
`

const RoborallyOptionsBoardImageContainer = styled.div`
  height: 600px;
  width: 600px;
`

type RoborallyOptionsBoardImageProps = {
  rowCount: number
}

const RoborallyOptionsBoardImage = styled.img`
  width: calc(
    100% / ${({ rowCount }: RoborallyOptionsBoardImageProps) => rowCount}
  );
`

function checkCheckpoints(options: RoborallyOptions): RoborallyOptions {
  const maxCheckpoints = getMaxCheckpoints(options.boardIds)
  return update(options, {
    checkpoints: checkpoints => clamp(checkpoints, 1, maxCheckpoints),
  })
}

const RoomOptionsRoborally = () => {
  const roomId = useRoomId()
  const options = useRoomOptions(roomId, GameType.ROBORALLY)
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
    <RoborallyOptionsContainer>
      <RoborallyOptionsTitle>Options</RoborallyOptionsTitle>
      {boardIds.map((boardId, index) => (
        <RoborallyOptionsRow key={`select-board-${index}`}>
          <RoborallyOptionsRowLabel>
            Board {index + 1}:
          </RoborallyOptionsRowLabel>
          <BoardSelector
            isChangeDisabled={isChangeDisabled}
            isRemoveDisabled={isChangeDisabled || !isCanRemoveBoard}
            onChange={value => onChangeBoardId(value, index)}
            onRemove={() => onRemoveBoardId(index)}
            value={boardId}
          />
        </RoborallyOptionsRow>
      ))}
      {isCanAddBoard && isEnabled && (
        <RoborallyOptionsRow key={`select-board-${boardCount}`}>
          <RoborallyOptionsRowLabel>
            Board {boardCount + 1}:
          </RoborallyOptionsRowLabel>
          <BoardSelector
            isChangeDisabled={isChangeDisabled}
            onChange={onAddBoardId}
            value={null}
          />
        </RoborallyOptionsRow>
      )}
      <RoborallyOptionsRow>
        <RoborallyOptionsRowLabel>Checkpoints:</RoborallyOptionsRowLabel>
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
      </RoborallyOptionsRow>
      <RoborallyOptionsBoardImageContainer>
        {boardIds.map((boardId, index) => (
          <RoborallyOptionsBoardImage
            key={index}
            rowCount={boardCountX}
            src={getBoardImage(boardId)}
            title={`Board ${index + 1}`}
          />
        ))}
      </RoborallyOptionsBoardImageContainer>
    </RoborallyOptionsContainer>
  )
}

export default RoomOptionsRoborally
