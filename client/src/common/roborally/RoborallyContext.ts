import { GameContext } from "common/GameContext"

import { BoardData, getCell, getWall, WallType } from "./model/BoardData"
import { Card } from "./model/Card"
import { CellData } from "./model/CellData"
import { Direction, isSamePos, Position } from "./model/Position"
import { RoborallyPlayer } from "./model/RoborallyPlayer"
import { GamePhase, RoborallyState } from "./model/RoborallyState"

export enum RoborallyEvent {
  CHANGE_PHASE = "change_phase",
  CHANGE_PLAYER = "change_player",
  CHECKPOINT = "checkpoint",
  DAMAGE = "damage",
  DESTROY = "destroy",
  MATERIALIZE = "materialize",
  MOVE = "move",
  RANDOMIZE = "randomize",
  REPAIR = "repair",
  RESPAWN = "respawn",
  ROTATE = "rotate",
  TELEPORT = "teleport",
}

export class RoborallyContext extends GameContext<
  RoborallyPlayer,
  RoborallyState,
  RoborallyEvent
> {
  getBoard(): BoardData {
    return this.state.board
  }

  getCell(pos: Position): CellData {
    return getCell(this.getBoard(), pos)
  }

  getCheckpoint(checkpoint: number): Position {
    return this.state.checkpoints[checkpoint]
  }

  getCheckpoints(): Position[] {
    return this.state.checkpoints
  }

  getCheckpointAtPosition(pos: Position): number | undefined {
    const checkpoint = this.state.checkpoints.findIndex(checkpointsPos =>
      isSamePos(pos, checkpointsPos)
    )
    return checkpoint >= 0 ? checkpoint : undefined
  }

  getDeck(): Card[] {
    return this.state.deck
  }

  getLastCheckpoint(): number {
    return this.state.checkpoints.length - 1
  }

  getPhase(): GamePhase {
    return this.state.phase
  }

  getSequence(): number {
    return this.state.sequence
  }

  getWall(pos: Position, dir: Direction): WallType {
    return getWall(this.getBoard(), pos, dir)
  }
}
