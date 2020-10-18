import React from "react"
import { Position } from "../common/Position"
import { CellData, CellType } from "../common/BoardData"
import styles from "./Board.module.css"

type BoardCellProps = {
  cell: CellData
  pos: Position
}

const BoardCell = ({ cell, pos }: BoardCellProps) => {
  return (
    <div
      className={styles.tile}
      style={{
        backgroundColor: cell.type === CellType.NORMAL ? "grey" : "black",
        transform: `translate(${pos.x * 36 + 36}px, ${pos.y * 36 + 36}px)`,
        borderTopColor:
          !!cell.wall && (cell.wall & 1) !== 0 ? "yellow" : "black",
        borderRightColor:
          !!cell.wall && (cell.wall & 2) !== 0 ? "yellow" : "black",
        borderBottomColor:
          !!cell.wall && (cell.wall & 4) !== 0 ? "yellow" : "black",
        borderLeftColor:
          !!cell.wall && (cell.wall & 8) !== 0 ? "yellow" : "black",
      }}
    />
  )
}

export default BoardCell
