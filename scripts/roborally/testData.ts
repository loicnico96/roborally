import { BoardId } from "common/roborally/model/BoardData"
import {
  RoborallyState,
  getInitialGameState,
} from "common/roborally/model/RoborallyState"
import {
  getPos,
  Direction,
} from "../../client/src/common/roborally/model/Position"
import {
  RoomId,
  RoomData,
  getInitialRoomData,
  GameType,
} from "common/model/RoomData"
import { BOARDS } from "./boards"

export const TEST_ROOM_ID = "id_test"
export const TEST_PLAYER_IDS = ["id_player_1", "id_player_2"]
export const TEST_CHECKPOINTS = [getPos(0, 0), getPos(3, 3), getPos(6, 6)]
export const TEST_BOARD_ID = BoardId.FLOOD_ZONE

export const GAMES: Record<RoomId, RoborallyState> = {
  [TEST_ROOM_ID]: getInitialGameState(
    TEST_BOARD_ID,
    BOARDS[TEST_BOARD_ID],
    TEST_CHECKPOINTS,
    TEST_PLAYER_IDS,
    TEST_CHECKPOINTS[0],
    Direction.NORTH
  ),
}

export const ROOMS: Record<RoomId, RoomData> = {
  [TEST_ROOM_ID]: getInitialRoomData(GameType.ROBORALLY, TEST_PLAYER_IDS[0]),
}
