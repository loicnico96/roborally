import {
  BoardId,
  BoardData,
  getEmptyBoard,
  setCell,
  getHole,
} from "../client/src/common/model/BoardData"
import {
  GameState,
  getInitialGameState,
} from "../client/src/common/model/GameState"
import { getPos, Direction } from "../client/src/common/model/Position"
import { RoomId, RoomData } from "../client/src/common/model/RoomData"

export const TEST_ROOM_ID = "id_test"
export const TEST_BOARD_ID = "id_board_0"
export const TEST_PLAYER_IDS = ["id_player_1", "id_player_2"]

export const ROOMS: Record<RoomId, RoomData> = {
  [TEST_ROOM_ID]: {
    // TODO
  },
}

export const GAMES: Record<RoomId, GameState> = {
  [TEST_ROOM_ID]: getInitialGameState(
    TEST_BOARD_ID,
    TEST_PLAYER_IDS,
    getPos(0, 0),
    Direction.NORTH
  ),
}

let BOARD = getEmptyBoard(10, 10)
BOARD = setCell(BOARD, getPos(5, 5), getHole())
BOARD = setCell(BOARD, getPos(6, 6), getHole())
BOARD = setCell(BOARD, getPos(7, 7), getHole())

export const BOARDS: Record<BoardId, BoardData> = {
  [TEST_BOARD_ID]: BOARD,
}