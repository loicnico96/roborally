import update, { Spec } from "immutability-helper"

import {
  BoardData,
  FeatureType,
  getCellIndex,
  getEmptyBoard,
  inBounds,
  LaserData,
  WallType,
} from "./BoardData"
import { CellBuilder } from "./CellBuilder"
import { CellData } from "./CellData"
import { Direction, getPos, getReverseDir, movePos, Position } from "./Position"

export class BoardBuilder {
  private board: BoardData

  static emptyBoard(x: number, y: number): BoardBuilder {
    return new BoardBuilder(getEmptyBoard(x, y))
  }

  constructor(board: BoardData) {
    this.board = board
  }

  build(): BoardData {
    return this.board
  }

  getCellIndex(pos: Position): number {
    return getCellIndex(this.board, pos)
  }

  inBounds(pos: Position): boolean {
    return inBounds(this.board, pos)
  }

  pos(x: number, y: number): CellBuilder {
    return new CellBuilder(this, getPos(x, y))
  }

  update(spec: Spec<BoardData>) {
    this.board = update(this.board, spec)
  }

  updateCell(pos: Position, spec: Spec<CellData>) {
    if (this.inBounds(pos)) {
      const cellIndex = this.getCellIndex(pos)
      this.update({
        cells: {
          [cellIndex]: spec,
        },
      })
    }
  }

  addCheckpoint(pos: Position) {
    this.update({
      checkpoints: {
        $push: [pos],
      },
    })
  }

  addFeature(feature: FeatureType) {
    if (!this.board.features.includes(feature)) {
      this.update({
        features: {
          $push: [feature],
        },
      })
    }
  }

  addLaser(laser: LaserData) {
    this.update({
      lasers: {
        $push: [laser],
      },
    })
  }

  addWall(
    pos: Position,
    dir: Direction,
    type: WallType,
    doubleSided: boolean = true
  ) {
    this.updateCell(pos, {
      walls: walls =>
        update(walls ?? {}, {
          $merge: {
            [dir]: type,
          },
        }),
    })

    if (doubleSided) {
      const reversePos = movePos(pos, dir, 1)
      const reverseDir = getReverseDir(dir)
      this.addWall(reversePos, reverseDir, type, false)
    }
  }
}
