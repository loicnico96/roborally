import BoardCross from "assets/boards/Cross.png"
import BoardExchange from "assets/boards/Exchange.png"
import BoardFloodZone from "assets/boards/FloodZone.png"
import BoardIsland from "assets/boards/Island.png"
import BoardPitMaze from "assets/boards/PitMaze.png"
import { BoardId } from "common/roborally/model/BoardData"

const BOARD_IMAGES: Record<BoardId, string> = {
  [BoardId.CROSS]: BoardCross,
  [BoardId.EXCHANGE]: BoardExchange,
  [BoardId.FLOOD_ZONE]: BoardFloodZone,
  [BoardId.ISLAND]: BoardIsland,
  [BoardId.PIT_MAZE]: BoardPitMaze,
}

export function getBoardImage(boardId: BoardId): string {
  return BOARD_IMAGES[boardId]
}
