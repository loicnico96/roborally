import { GameContext } from "common/model/GameContext"

import { BoardData, getCell, getWall, WallType } from "./BoardData"
import { Card } from "./Card"
import { CellData } from "./CellData"
import { Direction, isSamePos, Position } from "./Position"
import { RoborallyEvent } from "./RoborallyEvent"
import { GamePhase, RoborallyState } from "./RoborallyState"

export class RoborallyContext extends GameContext<
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
