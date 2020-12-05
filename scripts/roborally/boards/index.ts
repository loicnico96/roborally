import { BoardData, BoardId } from "common/roborally/model/BoardData"

import BOARD_CROSS from "./Cross"
import BOARD_EXCHANGE from "./Exchange"
import BOARD_FLOOD_ZONE from "./FloodZone"
import BOARD_ISLAND from "./Island"

export const BOARDS: Record<BoardId, BoardData> = {
  [BoardId.CROSS]: BOARD_CROSS,
  [BoardId.EXCHANGE]: BOARD_EXCHANGE,
  [BoardId.FLOOD_ZONE]: BOARD_FLOOD_ZONE,
  [BoardId.ISLAND]: BOARD_ISLAND,
}
