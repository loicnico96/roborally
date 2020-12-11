import BoardCanneryRow from "assets/boards/CanneryRow.png"
import BoardChess from "assets/boards/Chess.png"
import BoardChopShop from "assets/boards/ChopShop.png"
import BoardCross from "assets/boards/Cross.png"
import BoardExchange from "assets/boards/Exchange.png"
import BoardFloodZone from "assets/boards/FloodZone.png"
import BoardIsland from "assets/boards/Island.png"
import BoardLaserMaze from "assets/boards/LaserMaze.png"
import BoardMaelstrom from "assets/boards/Maelstrom.png"
import BoardPitMaze from "assets/boards/PitMaze.png"
import BoardSpinZone from "assets/boards/SpinZone.png"
import BoardVault from "assets/boards/Vault.png"
import { BoardId } from "common/roborally/model/BoardData"

const BOARD_IMAGES: Record<BoardId, string> = {
  [BoardId.CANNERY_ROW]: BoardCanneryRow,
  [BoardId.CHESS]: BoardChess,
  [BoardId.CHOP_SHOP]: BoardChopShop,
  [BoardId.CROSS]: BoardCross,
  [BoardId.EXCHANGE]: BoardExchange,
  [BoardId.FLOOD_ZONE]: BoardFloodZone,
  [BoardId.ISLAND]: BoardIsland,
  [BoardId.LASER_MAZE]: BoardLaserMaze,
  [BoardId.MAELSTROM]: BoardMaelstrom,
  [BoardId.PIT_MAZE]: BoardPitMaze,
  [BoardId.SPIN_ZONE]: BoardSpinZone,
  [BoardId.VAULT]: BoardVault,
}

export function getBoardImage(boardId: BoardId): string {
  return BOARD_IMAGES[boardId]
}