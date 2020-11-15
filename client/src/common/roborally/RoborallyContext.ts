import { GameContext } from "common/GameContext"
import { Board, getCell, getWall, WallType } from "./model/Board"
import { CellData } from "./model/CellData"
import { Direction, isSamePos, Position } from "./model/Position"
import { RoborallyPlayer } from "./model/RoborallyPlayer"
import { GamePhase, RoborallyState } from "./model/RoborallyState"

export class RoborallyContext extends GameContext<
  RoborallyPlayer,
  RoborallyState
> {
  getBoard(): Board {
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
