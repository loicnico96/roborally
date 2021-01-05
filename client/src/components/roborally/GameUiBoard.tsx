import React, { useMemo } from "react"
import styled from "styled-components"

import { RoomData } from "common/model/RoomData"
import {
  getCell,
  getWall,
  LaserType,
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
import { isAlive, isVirtual } from "common/roborally/model/RoborallyPlayer"
import { RoborallyState } from "common/roborally/model/RoborallyState"
import { useGameState } from "components/room/GameContext"
import { useRoomData } from "components/room/RoomContext"

import { getBoardImage } from "./BoardImage"
import GameUiObject from "./GameUiObject"
import { useViewport } from "./GameUiViewport"
import { fromViewportCoord } from "./Viewport"

type GameUiBoardBackgroundProps = {
  imageUrl: string
}

function getBackgroundUrl({ imageUrl }: GameUiBoardBackgroundProps): string {
  return imageUrl
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
      return `${cellType} (${getDir(cell.dir)} - turning)`
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

function getCellTooltip(gameState: RoborallyState, pos: Position): string {
  const cell = getCell(gameState.board, pos)
  switch (cell.type) {
    case CellType.CONVEYOR:
      return getConveyorTooltip(cell)
    case CellType.CONVEYOR_FAST:
      return getConveyorTooltip(cell)
    case CellType.GEAR:
      return getGearTooltip(cell)
    case CellType.HOLE:
      return getHoleTooltip(cell)
    case CellType.RANDOM:
      return "Randomizer"
    case CellType.REPAIR:
      return getRepairTooltip(cell)
    default:
      return isWater(cell) ? "Water" : ""
  }
}

function getCheckpointTooltip(
  gameState: RoborallyState,
  pos: Position
): string {
  const checkpoint = gameState.checkpoints.findIndex(checkpointPos =>
    isSamePos(pos, checkpointPos)
  )
  if (checkpoint >= 0) {
    return `Checkpoint ${checkpoint}`
  }
  return ""
}

function getCrusherTooltip(gameState: RoborallyState, pos: Position): string {
  const cell = getCell(gameState.board, pos)
  if (cell.crush) {
    const sequences = cell.crush.map(seq => seq + 1)
    return `Crusher (${sequences.join("-")})`
  }
  return ""
}

function getPusherTooltip(gameState: RoborallyState, pos: Position): string {
  const cell = getCell(gameState.board, pos)
  if (cell.push) {
    const sequences = cell.push.map(seq => seq + 1)
    if (cell.pushDir !== undefined) {
      return `Pusher (${sequences.join("-")}, ${getDir(cell.pushDir)})`
    }
    return `Pusher (${sequences.join("-")})`
  }
  return ""
}

function getWallTooltip(gameState: RoborallyState, pos: Position): string {
  const dirs = DIRS.filter(
    dir => getWall(gameState.board, pos, dir) !== WallType.NONE
  )
  if (dirs.length > 0) {
    return `Walls: ${dirs.map(getDir).join(", ")}`
  }
  return ""
}

function getLaserTooltips(gameState: RoborallyState, pos: Position): string[] {
  return gameState.board.lasers.map(laser => {
    if (isSamePos(laser.pos, pos)) {
      const laserDir = getDir(laser.dir)
      const laserType = {
        [LaserType.NORMAL]: `Laser x${laser.damage}`,
        [LaserType.FLAME]: "Flamethrower",
      }[laser.type]

      if (laser.seq !== undefined) {
        const sequences = laser.seq.map(seq => seq + 1)
        return `${laserType} (${sequences.join("-")}, ${laserDir})`
      }

      return `${laserType} (${laserDir})`
    }

    return ""
  })
}

function getPlayerTooltips(
  gameState: RoborallyState,
  roomData: RoomData,
  pos: Position
): string[] {
  return gameState.playerOrder.map(playerId => {
    const player = gameState.players[playerId]
    if (isSamePos(player.pos, pos) && isAlive(player)) {
      const playerName = roomData.players[playerId].name
      if (isVirtual(player)) {
        return `${playerName} (virtual)`
      }

      return playerName
    }

    return ""
  })
}

function getTooltip(
  gameState: RoborallyState,
  roomData: RoomData,
  pos: Position
): string {
  return [
    getCellTooltip(gameState, pos),
    getCheckpointTooltip(gameState, pos),
    getCrusherTooltip(gameState, pos),
    getPusherTooltip(gameState, pos),
    getWallTooltip(gameState, pos),
    ...getLaserTooltips(gameState, pos),
    ...getPlayerTooltips(gameState, roomData, pos),
  ]
    .filter(tooltip => tooltip)
    .join("\n")
}

const GameUiBoardBackground = styled(GameUiObject)`
  background-image: url(${getBackgroundUrl});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`

const GameUiBoard = () => {
  const gameState = useGameState()
  const roomData = useRoomData()
  const { mousePos } = useViewport()

  const tooltip = useMemo(
    () =>
      getTooltip(gameState, roomData, {
        x: Math.floor(fromViewportCoord(mousePos.x)),
        y: Math.floor(fromViewportCoord(mousePos.y)),
      }),
    [gameState, mousePos, roomData]
  )

  return (
    <GameUiBoardBackground
      height={gameState.board.dimensions.y}
      imageUrl={getBoardImage(gameState.boardId)}
      title={tooltip}
      width={gameState.board.dimensions.x}
      x={0}
      y={0}
    />
  )
}

export default GameUiBoard
