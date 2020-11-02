import { BoardId, BoardData } from "../client/src/common/model/BoardData"
import {
  GameState,
  getInitialGameState,
} from "../client/src/common/model/GameState"
import { Pos, Direction } from "../client/src/common/model/Position"
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
    Pos(0, 0),
    Direction.North
  ),
}

export const BOARDS: Record<BoardId, BoardData> = {
  [TEST_BOARD_ID]: {
    // TODO
  },
}
