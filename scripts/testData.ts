import { BoardData, CellType } from "../client/src/common/BoardData"
import { GameData } from "../client/src/common/GameData"

export const ROOMS: Record<string, {}> = {
  ["id_test"]: {
    // Nothing
  },
}

export const GAMES: Record<string, GameData> = {
  ["id_test"]: {
    board_id: "id_board_0",
  },
}

export const BOARDS: Record<string, BoardData> = {
  ["id_board_0"]: {
    cells: Array.from({ length: 100 }).map(() => ({ type: CellType.NORMAL })),
    checkpoints: { 0: [1, 1], 1: [3, 4], 2: [7, 5] },
    dimensions: [10, 10],
  },
}
