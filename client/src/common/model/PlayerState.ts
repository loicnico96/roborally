import { Card } from "./Card"
import { Direction, Position } from "./Position"
import { Program, getEmptyProgram } from "./Program"

export type PlayerId = string

export type PlayerState = {
  cards: Card[]
  checkpoint: number
  checkpointDir: Direction
  damage: number
  down: boolean
  downNext: boolean
  pos: Position
  program: Program
  ready: boolean
  rot: number
}

export function getInitialPlayerState(
  initialPos: Position,
  initialDir: Direction,
  initialCheckpoint = 0,
  initialDamage = 0
): PlayerState {
  return {
    cards: [],
    checkpoint: initialCheckpoint,
    checkpointDir: initialDir,
    damage: initialDamage,
    down: false,
    downNext: false,
    pos: initialPos,
    program: getEmptyProgram(),
    ready: false,
    rot: initialDir,
  }
}
