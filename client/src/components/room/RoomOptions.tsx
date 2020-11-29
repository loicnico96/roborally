import React, { useCallback } from "react"
import styled from "styled-components"

import { BoardId } from "common/roborally/model/BoardData"

import { useRoomData } from "./RoomContext"

function getBoardName(boardId: BoardId): string {
  return {
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
`

const RoomOptionsRowLabel = styled.div`
  margin-right: 4px;
`

const RoomOptions = () => {
  const { options } = useRoomData()

  const onSelectBoardId = useCallback(() => {
    console.log("Not implemented")
  }, [])

  return (
    <RoomOptionsContainer>
      <RoomOptionsTitle>Options</RoomOptionsTitle>
      <RoomOptionsRow>
        <RoomOptionsRowLabel>Board:</RoomOptionsRowLabel>
        <select onChange={onSelectBoardId} value={options.boardId}>
          {Object.values(BoardId).map(boardId => (
            <option key={boardId} value={boardId}>
              {getBoardName(boardId)}
            </option>
          ))}
        </select>
      </RoomOptionsRow>
    </RoomOptionsContainer>
  )
}

export default RoomOptions
