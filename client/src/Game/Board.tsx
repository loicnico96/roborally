import React from "react"
import styles from "./Board.module.css"
import BoardCell from "./BoardCell"
import { useBoardData } from "../Room/hooks/useBoardData"

const Board = () => {
  const { dimensions, cells } = useBoardData()

  return (
    <div className={styles.container}>
      {cells.map((cell, index) => {
        const x = index % dimensions[0]
        const y = (index - x) / dimensions[0]
        return <BoardCell key={`${x}-${y}`} cell={cell} pos={{ x, y }} />
      })}
    </div>
  )
}

export default Board
