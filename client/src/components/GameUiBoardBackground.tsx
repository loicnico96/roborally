import { BoardData, CellType, getCell } from "common/model/BoardData"
import { Direction, Position, Rotation } from "common/model/Position"
import React, { useCallback, useState } from "react"
import styled from "styled-components"

import BoardIsland from "../assets/Boards/Base Game/Island.png"

const CELL_SIZE = 100

type BoardBackgroundProps = {
  board: BoardData
  imageUrl: string
}

function getBackgroundUrl({ imageUrl }: BoardBackgroundProps): string {
  return imageUrl
}

function getBackgroundSize({ board }: BoardBackgroundProps): number {
  return board.dimensions.x * CELL_SIZE
}

function getDir(dir: Direction): string {
  switch (dir) {
    case Direction.NORTH:
      return "North"
    case Direction.EAST:
      return "East"
    case Direction.SOUTH:
      return "South"
    case Direction.WEST:
      return "West"
    default:
      return ""
  }
}

function getRot(rot: Rotation): string {
  switch (rot) {
    case Rotation.LEFT:
      return "left"
    case Rotation.RIGHT:
      return "right"
    case Rotation.REVERSE:
      return "reverse"
    default:
      return ""
  }
}

function getTooltip(board: BoardData, pos: Position): string {
  const cell = getCell(board, pos)
  switch (cell.type) {
    case CellType.HOLE:
      return "Hole"
    case CellType.CONVEYOR:
      if (cell.dir !== undefined) {
        if (cell.rot !== undefined) {
          return `Conveyor (${getDir(cell.dir)}, ${getRot(cell.rot)})`
        }
        return `Conveyor (${getDir(cell.dir)})`
      }
      return "Conveyor"
    case CellType.CONVEYOR_FAST:
      if (cell.dir !== undefined) {
        if (cell.rot !== undefined) {
          return `Conveyor (fast, ${getDir(cell.dir)}, ${getRot(cell.rot)})`
        }
        return `Conveyor (fast, ${getDir(cell.dir)})`
      }
      return "Conveyor (fast)"
    case CellType.GEAR:
      if (cell.rot !== undefined) {
        return `Gear (${getRot(cell.rot)})`
      }
      return "Gear"
    case CellType.REPAIR:
      return "Repair site"
    default:
      return ""
  }
}

const BoardBackground = styled.div`
  background-image: url(${getBackgroundUrl});
  background-repeat: no-repeat;
  background-size: ${getBackgroundSize}px;
  height: ${getBackgroundSize}px;
  width: ${getBackgroundSize}px;
`

type GameUiBoardBackgroundProps = {
  board: BoardData
}

const GameUiBoardBackground = ({ board }: GameUiBoardBackgroundProps) => {
  const [tooltip, setTooltip] = useState("")

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const elementRect = e.currentTarget.getBoundingClientRect()
      const mousePosition = {
        x: e.pageX - elementRect.left,
        y: e.pageY - elementRect.top,
      }
      const boardPosition = {
        x: Math.floor(mousePosition.x / CELL_SIZE),
        y: Math.floor(mousePosition.y / CELL_SIZE),
      }
      const newTooltip = getTooltip(board, boardPosition)
      if (newTooltip !== tooltip) {
        setTooltip(newTooltip)
      }
    },
    [board, tooltip]
  )

  return (
    <BoardBackground
      board={board}
      imageUrl={BoardIsland}
      title={tooltip}
      onMouseMove={onMouseMove}
    />
  )
}

export default GameUiBoardBackground
