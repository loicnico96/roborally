import React, { useCallback, useState } from "react"
import styled from "styled-components"

import {
  BoardData,
  BoardId,
  getCell,
  getWall,
  WallType,
} from "common/roborally/model/BoardData"
import {
  CellData,
  CellType,
  isFastConveyor,
  isTurnConveyor,
  isWater,
} from "common/roborally/model/CellData"
import {
  Direction,
  isSamePos,
  Position,
  Rotation,
} from "common/roborally/model/Position"

import { getBoardImage } from "./BoardImage"

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

const DIRS = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST]

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

function getConveyorTooltip(cell: CellData): string {
  const cellType = isWater(cell)
    ? "Water current"
    : isFastConveyor(cell)
    ? "Fast conveyor"
    : "Conveyor"

  if (cell.dir !== undefined) {
    if (isTurnConveyor(cell)) {
      return `${cellType} (turning, ${getDir(cell.dir)})`
    }
    return `${cellType} (${getDir(cell.dir)})`
  }
  return cellType
}

function getGearTooltip(cell: CellData): string {
  const cellType = "Gear"
  if (cell.rot !== undefined) {
    return `${cellType} (${getRot(cell.rot)})`
  }
  return cellType
}

function getHoleTooltip(cell: CellData): string {
  return isWater(cell) ? "Water drain" : "Hole"
}

function getRepairTooltip(cell: CellData): string {
  const cellType = "Repair site"
  return isWater(cell) ? `${cellType} (water)` : cellType
}

function getCellTooltip(board: BoardData, pos: Position): string {
  const cell = getCell(board, pos)
  switch (cell.type) {
    case CellType.HOLE:
      return getHoleTooltip(cell)
    case CellType.CONVEYOR:
      return getConveyorTooltip(cell)
    case CellType.CONVEYOR_FAST:
      return getConveyorTooltip(cell)
    case CellType.GEAR:
      return getGearTooltip(cell)
    case CellType.REPAIR:
      return getRepairTooltip(cell)
    default:
      return isWater(cell) ? "Water" : ""
  }
}

function getCheckpointTooltip(board: BoardData, pos: Position): string {
  const checkpoint = board.checkpoints.findIndex(checkpointPos =>
    isSamePos(pos, checkpointPos)
  )
  if (checkpoint >= 0) {
    return `Checkpoint ${checkpoint}`
  }
  return ""
}

function getCrusherTooltip(board: BoardData, pos: Position): string {
  const cell = getCell(board, pos)
  if (cell.crush) {
    return `Crusher (${cell.crush.join(", ")})`
  }
  return ""
}

function getWallTooltip(board: BoardData, pos: Position): string {
  const dirs = DIRS.filter(dir => getWall(board, pos, dir) !== WallType.NONE)
  if (dirs.length > 0) {
    return `Walls: ${dirs.map(getDir).join(", ")}`
  }
  return ""
}

function getTooltip(board: BoardData, pos: Position): string {
  return [
    getCellTooltip(board, pos),
    getCheckpointTooltip(board, pos),
    getCrusherTooltip(board, pos),
    getWallTooltip(board, pos),
  ]
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
  boardId: BoardId
  board: BoardData
}>

const GameUiBoard = ({ board, boardId, children }: GameUiBoardProps) => {
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
      imageUrl={getBoardImage(boardId)}
      onMouseMove={onMouseMove}
      title={tooltip}
    >
      {children}
    </GameUiBoardBackground>
  )
}

export default GameUiBoard
