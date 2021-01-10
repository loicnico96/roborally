import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomData, RoomId } from "common/model/RoomData"
import { UserInfo } from "common/model/UserInfo"
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
  isOil,
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
import { getRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { useStore } from "hooks/useStore"
import { Store } from "utils/store"

import { getGameState } from "./useGameState"

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

function getTeleporterTooltip(): string {
  return "Teleporter"
}

function getRandomizerTooltip(): string {
  return "Randomizer"
}

function getPortalTooltip(): string {
  return "Portal"
}

function getNormalTooltip(cell: CellData): string {
  if (isWater(cell)) {
    return "Water"
  } else if (isOil(cell)) {
    return "Oil slick"
  } else {
    return ""
  }
}

function getCellTooltip(gameState: RoborallyState, pos: Position): string {
  const cell = getCell(gameState.board, pos)
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
    case CellType.TELEPORT:
      return getTeleporterTooltip()
    case CellType.RANDOM:
      return getRandomizerTooltip()
    case CellType.PORTAL:
      return getPortalTooltip()
    default:
      return getNormalTooltip(cell)
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
  pos: Position,
  roomPlayers: Record<PlayerId, UserInfo>
): string[] {
  return gameState.playerOrder.map(playerId => {
    const player = gameState.players[playerId]
    if (isSamePos(player.pos, pos) && isAlive(player)) {
      const playerName = roomPlayers[playerId].name
      if (isVirtual(player)) {
        return `${playerName} (virtual)`
      }

      return playerName
    }

    return ""
  })
}

function getBoardTooltip(store: Store, roomId: RoomId, pos: Position): string {
  const gameState = getGameState(store, roomId)
  const { players } = getRoomData(store, roomId)

  return [
    getCellTooltip(gameState, pos),
    getCheckpointTooltip(gameState, pos),
    getCrusherTooltip(gameState, pos),
    getPusherTooltip(gameState, pos),
    getWallTooltip(gameState, pos),
    ...getLaserTooltips(gameState, pos),
    ...getPlayerTooltips(gameState, pos, players),
  ]
    .filter(tooltip => tooltip)
    .join("\n")
}

export function getRoomPlayers(room: RoomData): Record<PlayerId, UserInfo> {
  return room.players
}

export function useBoardTooltip(pos: Position): string {
  const roomId = useRoomId()
  return useStore(
    useCallback(store => getBoardTooltip(store, roomId, pos), [pos, roomId])
  )
}
