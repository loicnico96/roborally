import { BoardData, BoardId } from "common/roborally/model/BoardData"

import BOARD_CANNERY_ROW from "./CanneryRow"
import BOARD_CROSS from "./Cross"
import BOARD_EXCHANGE from "./Exchange"
import BOARD_FLOOD_ZONE from "./FloodZone"
import BOARD_ISLAND from "./Island"
import BOARD_LASER_MAZE from "./LaserMaze"
import BOARD_PIT_MAZE from "./PitMaze"

export const BOARDS: Record<BoardId, BoardData> = {
  [BoardId.CANNERY_ROW]: BOARD_CANNERY_ROW,
  [BoardId.CROSS]: BOARD_CROSS,
  [BoardId.EXCHANGE]: BOARD_EXCHANGE,
  [BoardId.FLOOD_ZONE]: BOARD_FLOOD_ZONE,
  [BoardId.ISLAND]: BOARD_ISLAND,
  [BoardId.LASER_MAZE]: BOARD_LASER_MAZE,
  [BoardId.PIT_MAZE]: BOARD_PIT_MAZE,
}
