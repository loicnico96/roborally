import React, { useCallback } from "react"
import styled from "styled-components"

import { GameOptions } from "common/GameSettings"
import { BoardId } from "common/roborally/model/BoardData"
import { validateEnum } from "common/utils/validation"
import { triggerRoomOptions } from "functions/triggers"
import { useTrans } from "hooks/useTrans"

import { useRoomData, useRoomId } from "./RoomContext"

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

type SelectEvent = React.ChangeEvent<HTMLSelectElement>

const RoomOptions = () => {
  const roomId = useRoomId()
  const t = useTrans("RoomOptions")

  const changeOptions = useCallback(
    async (options: Partial<GameOptions>) => {
      try {
        await triggerRoomOptions({ options, roomId })
      } catch (error) {
        console.error(error)
      }
    },
    [roomId]
  )

  const { options } = useRoomData()

  const onSelectBoardId = useCallback(
    (event: SelectEvent) => {
      const boardId = validateEnum(BoardId)(event.target.value)
      if (boardId !== options.boardId) {
        changeOptions({ boardId })
      }
    },
    [changeOptions, options]
  )

  return (
    <RoomOptionsContainer>
      <RoomOptionsTitle>{t("title")}</RoomOptionsTitle>
      <RoomOptionsRow>
        <RoomOptionsRowLabel>{t("boardLabel")}</RoomOptionsRowLabel>
        <select defaultValue={options.boardId} onChange={onSelectBoardId}>
          {Object.values(BoardId).map(boardId => (
            <option key={boardId} value={boardId}>
              {t.BoardName(boardId)}
            </option>
          ))}
        </select>
      </RoomOptionsRow>
    </RoomOptionsContainer>
  )
}

export default RoomOptions
