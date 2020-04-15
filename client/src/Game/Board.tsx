import React, { FC } from 'react'
import { BoardData } from '../common/BoardData'
import styles from './Board.module.css'
import BoardCell from './BoardCell';

type BoardProps = {
  board_data: BoardData
}

const Board: FC<BoardProps> = ({ board_data }) => {
  const { dimensions, cells } = board_data

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
