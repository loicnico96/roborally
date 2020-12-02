import BoardFloodZone from "assets/boards/FloodZone.png"
import BoardIsland from "assets/boards/Island.png"
import { BoardId } from "common/roborally/model/BoardData"

const BOARD_IMAGES: Record<BoardId, string> = {
  [BoardId.FLOOD_ZONE]: BoardFloodZone,
  [BoardId.ISLAND]: BoardIsland,
}

export function getBoardImage(boardId: BoardId): string {
  return BOARD_IMAGES[boardId]
}
