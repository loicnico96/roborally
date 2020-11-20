import { BoardData, BoardId } from "common/roborally/model/BoardData"

import BOARD_FLOOD_ZONE from "./FloodZone"
import BOARD_ISLAND from "./Island"

export const BOARDS: Record<BoardId, BoardData> = {
  [BoardId.FLOOD_ZONE]: BOARD_FLOOD_ZONE,
  [BoardId.ISLAND]: BOARD_ISLAND,
}
