import { BoardId, Board } from "common/roborally/model/Board"
import {
  RoborallyState,
  getInitialGameState,
} from "common/roborally/model/RoborallyState"
import {
  getPos,
  Direction,
} from "../../client/src/common/roborally/model/Position"
import { RoomId, RoomData } from "common/model/RoomData"

import { BOARD_ISLAND } from "./boards/Island"

export const TEST_ROOM_ID = "id_test"
export const TEST_PLAYER_IDS = ["id_player_1"]
export const TEST_CHECKPOINTS = [getPos(0, 0), getPos(3, 3), getPos(6, 6)]

export const BOARDS: Record<BoardId, Board> = {
  [BoardId.ISLAND]: BOARD_ISLAND,
}

export const GAMES: Record<RoomId, RoborallyState> = {
  [TEST_ROOM_ID]: getInitialGameState(
    BoardId.ISLAND,
    BOARD_ISLAND,
    TEST_CHECKPOINTS,
    TEST_PLAYER_IDS,
    TEST_CHECKPOINTS[0],
    Direction.NORTH
  ),
}

export const ROOMS: Record<RoomId, RoomData> = {
  [TEST_ROOM_ID]: {
    // TODO
  },
}
