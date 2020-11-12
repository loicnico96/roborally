import {
  BoardId,
  BoardData,
} from "../../client/src/common/roborally/model/BoardData"
import {
  RoborallyState,
  getInitialGameState,
} from "../../client/src/common/roborally/model/RoborallyState"
import {
  getPos,
  Direction,
} from "../../client/src/common/roborally/model/Position"
import { RoomId, RoomData } from "../../client/src/common/model/RoomData"

import { BOARD_ISLAND } from "./boards/Island"

export const TEST_ROOM_ID = "id_test"
export const TEST_PLAYER_IDS = ["id_player_1"]

export const BOARDS: Record<BoardId, BoardData> = {
  [BoardId.ISLAND]: BOARD_ISLAND,
}

export const GAMES: Record<RoomId, RoborallyState> = {
  [TEST_ROOM_ID]: getInitialGameState(
    BoardId.ISLAND,
    BOARD_ISLAND,
    TEST_PLAYER_IDS,
    getPos(0, 0),
    Direction.NORTH
  ),
}

export const ROOMS: Record<RoomId, RoomData> = {
  [TEST_ROOM_ID]: {
    // TODO
  },
}
