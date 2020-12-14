import { RoborallyState } from "common/roborally/model/RoborallyState"

const BOARD_MARGIN = 200
const CELL_SIZE = 100

export function getCellSize(): number {
  return CELL_SIZE
}

export function toViewportSize(size: number): number {
  return size * CELL_SIZE
}

export function fromViewportSize(size: number): number {
  return size / CELL_SIZE
}

export function toViewportCoord(coord: number): number {
  return toViewportSize(coord) + BOARD_MARGIN
}

export function fromViewportCoord(coord: number): number {
  return fromViewportSize(coord - BOARD_MARGIN)
}

export function getViewportHeight(gameState: RoborallyState): number {
  return toViewportSize(gameState.board.dimensions.y) + BOARD_MARGIN * 2
}

export function getViewportWidth(gameState: RoborallyState): number {
  return toViewportSize(gameState.board.dimensions.x) + BOARD_MARGIN * 2
}
