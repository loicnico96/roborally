import { BoardData, BoardId } from "common/roborally/model/BoardData"

import BOARD_CANNERY_ROW from "./CanneryRow"
import BOARD_CHESS from "./Chess"
import BOARD_CHOP_SHOP from "./ChopShop"
import BOARD_CIRCUIT_TRAP from "./CircuitTrap"
import BOARD_CROSS from "./Cross"
import BOARD_EXCHANGE from "./Exchange"
import BOARD_FLOOD_ZONE from "./FloodZone"
import BOARD_ISLAND from "./Island"
import BOARD_LASER_MAZE from "./LaserMaze"
import BOARD_MAELSTROM from "./Maelstrom"
import BOARD_PIT_MAZE from "./PitMaze"
import BOARD_SPIN_ZONE from "./SpinZone"
import BOARD_VAULT from "./Vault"

export const BOARDS: Record<BoardId, BoardData> = {
  [BoardId.CANNERY_ROW]: BOARD_CANNERY_ROW,
  [BoardId.CHESS]: BOARD_CHESS,
  [BoardId.CHOP_SHOP]: BOARD_CHOP_SHOP,
  [BoardId.CIRCUIT_TRAP]: BOARD_CIRCUIT_TRAP,
  [BoardId.CROSS]: BOARD_CROSS,
  [BoardId.EXCHANGE]: BOARD_EXCHANGE,
  [BoardId.FLOOD_ZONE]: BOARD_FLOOD_ZONE,
  [BoardId.ISLAND]: BOARD_ISLAND,
  [BoardId.LASER_MAZE]: BOARD_LASER_MAZE,
  [BoardId.MAELSTROM]: BOARD_MAELSTROM,
  [BoardId.PIT_MAZE]: BOARD_PIT_MAZE,
  [BoardId.SPIN_ZONE]: BOARD_SPIN_ZONE,
  [BoardId.VAULT]: BOARD_VAULT,
}
