import {
  BoardData,
  CellType,
  getCell,
  getWall,
  WallType,
} from "common/model/BoardData"
import { Direction, Position, Rotation } from "common/model/Position"
import React, { useCallback, useState } from "react"
import styled from "styled-components"

import BoardIsland from "../assets/Boards/Base Game/Island.png"

const CELL_SIZE = 100

type GameUiBoardBackgroundProps = {
  board: BoardData
  imageUrl: string
}

function getBackgroundUrl({ imageUrl }: GameUiBoardBackgroundProps): string {
  return imageUrl
}

function getBackgroundSizeX({ board }: GameUiBoardBackgroundProps): number {
  return board.dimensions.x * CELL_SIZE
}

function getBackgroundSizeY({ board }: GameUiBoardBackgroundProps): number {
  return board.dimensions.y * CELL_SIZE
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
      return "Left"
    case Rotation.RIGHT:
      return "Right"
    case Rotation.REVERSE:
      return "Reverse"
    default:
      return ""
  }
}

function getCellTooltip(board: BoardData, pos: Position): string {
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

const DIRS = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST]

function getWallTooltip(board: BoardData, pos: Position): string {
  const dirs = DIRS.filter(dir => getWall(board, pos, dir) !== WallType.NONE)
  if (dirs.length > 0) {
    return `Walls: ${dirs.map(getDir).join(", ")}`
  }
  return ""
}

function getTooltip(board: BoardData, pos: Position): string {
  return [getCellTooltip(board, pos), getWallTooltip(board, pos)]
    .filter(tooltip => tooltip)
    .join("\n")
}

const GameUiBoardBackground = styled.div`
  background-image: url(${getBackgroundUrl});
  background-repeat: no-repeat;
  background-size: ${getBackgroundSizeX}px ${getBackgroundSizeY}px;
  height: ${getBackgroundSizeY}px;
  margin: ${CELL_SIZE}px;
  width: ${getBackgroundSizeX}px;
`

type GameUiBoardProps = React.PropsWithChildren<{
  board: BoardData
}>

const GameUiBoard = ({ board, children }: GameUiBoardProps) => {
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
    <GameUiBoardBackground
      board={board}
      imageUrl={BoardIsland}
      onMouseMove={onMouseMove}
      title={tooltip}
    >
      {children}
    </GameUiBoardBackground>
  )
}

export default GameUiBoard
