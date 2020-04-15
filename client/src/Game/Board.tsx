import React, { FC } from 'react'
import { BoardData, CellType } from '../common/BoardData'
import styles from './Board.module.css'

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
        return (
          <div
            className={styles.tile}
            style={{
              backgroundColor: cell.type === CellType.NORMAL ? 'grey' : 'black',
              transform: `translate(${x * 36 + 36}px, ${y * 36 + 36}px)`,
            }}
          />
        )
      })}
    </div>
  )
}

export default Board
