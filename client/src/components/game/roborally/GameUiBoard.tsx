import React, { useMemo } from "react"
import styled from "styled-components"

import BoardImage from "./BoardImage"
import GameUiObject from "./GameUiObject"
import { useViewport } from "./GameUiViewport"
import { useBoardTooltip } from "./hooks/useBoardTooltip"
import { useRoborallyState } from "./hooks/useRoborallyState"
import { getBoardHeight, getBoardIds, getBoardWidth } from "./utils/getters"
import { fromViewportCoord } from "./Viewport"

const GameUiBoardImage = styled(BoardImage)`
  height: 100%;
  pointer-events: none;
  user-select: none;
  width: 100%;
`

const GameUiBoard = () => {
  const boardSizeX = useRoborallyState(getBoardWidth)
  const boardSizeY = useRoborallyState(getBoardHeight)
  const boardIds = useRoborallyState(getBoardIds)

  const { mousePos } = useViewport()

  const boardPos = useMemo(
    () => ({
      x: Math.floor(fromViewportCoord(mousePos.x)),
      y: Math.floor(fromViewportCoord(mousePos.y)),
    }),
    [mousePos]
  )

  const boardCount = boardIds.length
  const boardCountX = Math.ceil(Math.sqrt(boardCount))
  const boardCountY = Math.ceil(boardCount / boardCountX)
  const tooltip = useBoardTooltip(boardPos)

  return (
    <>
      {boardIds.map((boardId, boardIndex) => (
        <GameUiObject
          key={boardIndex}
          height={boardSizeY / boardCountY}
          title={tooltip}
          width={boardSizeX / boardCountX}
          x={Math.floor(boardIndex % boardCountX) * (boardSizeX / boardCountX)}
          y={Math.floor(boardIndex / boardCountX) * (boardSizeY / boardCountY)}
        >
          <GameUiBoardImage boardId={boardId} />
        </GameUiObject>
      ))}
    </>
  )
}

export default GameUiBoard
