import update from "immutability-helper"
import React, { useCallback } from "react"
import styled from "styled-components"

import { BoardId } from "common/roborally/model/BoardData"
import { getBoardImage } from "components/roborally/BoardImage"
import Box from "components/ui/Box"
import { useChangeRoomOptions } from "hooks/room/useChangeRoomOptions"
import { useAsyncHandler } from "hooks/useAsyncHandler"

import BoardSelector from "./BoardSelector"
import { useRoomData, useRoomId } from "./RoomContext"

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

const RoomOptions = () => {
  const roomId = useRoomId()
  const roomData = useRoomData()
  const [changeOptions, isEnabled] = useChangeRoomOptions(roomId, roomData)
  const [changeOptionsSafe, isChanging] = useAsyncHandler(changeOptions)

  const { options } = roomData

  const onAddBoardId = useCallback(
    (boardId: BoardId) => {
      changeOptionsSafe(
        update(options, {
          boardIds: {
            $push: [boardId],
          },
        })
      )
    },
    [changeOptionsSafe, options]
  )

  const onChangeBoardId = useCallback(
    (boardId: BoardId, index: number) => {
      changeOptionsSafe(
        update(options, {
          boardIds: {
            [index]: {
              $set: boardId,
            },
          },
        })
      )
    },
    [changeOptionsSafe, options]
  )

  const onRemoveBoardId = useCallback(
    (index: number) => {
      changeOptionsSafe(
        update(options, {
          boardIds: {
            $splice: [[index, 1]],
          },
        })
      )
    },
    [changeOptionsSafe, options]
  )

  const { boardIds } = options

  const boardCount = boardIds.length
  const boardCountX = Math.ceil(Math.sqrt(boardCount))
  const isCanAddBoard = boardCount < 4
  const isCanRemoveBoard = boardCount > 1
  const isChangeDisabled = isChanging || !isEnabled

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

export default RoomOptions
