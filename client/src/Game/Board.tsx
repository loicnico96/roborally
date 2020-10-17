import React, { FC } from 'react'
import { BoardData } from '../common/BoardData'
import styles from './Board.module.css'
import BoardCell from './BoardCell'

type BoardProps = {
  boardData: BoardData
}

const Board: FC<BoardProps> = ({ boardData }) => {
  const { dimensions, cells } = boardData

  return (
    <div className={styles.container}>
      {cells.map((cell, index) => {
        const x = index % dimensions[0]
        const y = (index - x) / dimensions[0]
        return <BoardCell cell={cell} pos={[x, y]} />
      })}
    </div>
  )
}

export default Board
