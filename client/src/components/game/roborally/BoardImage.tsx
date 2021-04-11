import React from "react"

import BoardArkhamAsylum from "assets/roborally/boards/ArkhamAsylum.png"
import BoardBlastFurnace from "assets/roborally/boards/BlastFurnace.png"
import BoardCanneryRow from "assets/roborally/boards/CanneryRow.png"
import BoardChasm from "assets/roborally/boards/Chasm.png"
import BoardChess from "assets/roborally/boards/Chess.png"
import BoardChopShop from "assets/roborally/boards/ChopShop.png"
import BoardCircuitTrap from "assets/roborally/boards/CircuitTrap.png"
import BoardCross from "assets/roborally/boards/Cross.png"
import BoardExchange from "assets/roborally/boards/Exchange.png"
import BoardFloodZone from "assets/roborally/boards/FloodZone.png"
import BoardGearBox from "assets/roborally/boards/GearBox.png"
import BoardIsland from "assets/roborally/boards/Island.png"
import BoardLaserMaze from "assets/roborally/boards/LaserMaze.png"
import BoardMachineShop from "assets/roborally/boards/MachineShop.png"
import BoardMaelstrom from "assets/roborally/boards/Maelstrom.png"
import BoardPitMaze from "assets/roborally/boards/PitMaze.png"
import BoardSpinZone from "assets/roborally/boards/SpinZone.png"
import BoardVault from "assets/roborally/boards/Vault.png"
import { BoardId } from "common/roborally/model/BoardData"

const BOARD_IMAGES: Record<BoardId, string> = {
  [BoardId.ARKHAM_ASYLUM]: BoardArkhamAsylum,
  [BoardId.BLAST_FURNACE]: BoardBlastFurnace,
  [BoardId.CANNERY_ROW]: BoardCanneryRow,
  [BoardId.CHASM]: BoardChasm,
  [BoardId.CHESS]: BoardChess,
  [BoardId.CHOP_SHOP]: BoardChopShop,
  [BoardId.CIRCUIT_TRAP]: BoardCircuitTrap,
  [BoardId.CROSS]: BoardCross,
  [BoardId.EXCHANGE]: BoardExchange,
  [BoardId.FLOOD_ZONE]: BoardFloodZone,
  [BoardId.GEAR_BOX]: BoardGearBox,
  [BoardId.ISLAND]: BoardIsland,
  [BoardId.LASER_MAZE]: BoardLaserMaze,
  [BoardId.MACHINE_SHOP]: BoardMachineShop,
  [BoardId.MAELSTROM]: BoardMaelstrom,
  [BoardId.PIT_MAZE]: BoardPitMaze,
  [BoardId.SPIN_ZONE]: BoardSpinZone,
  [BoardId.VAULT]: BoardVault,
}

export type BoardImageProps = React.HtmlHTMLAttributes<HTMLImageElement> & {
  boardId: BoardId
}

export function getBoardImage(boardId: BoardId): string {
  return BOARD_IMAGES[boardId]
}

const BoardImage = ({ boardId, ...props }: BoardImageProps) => (
  <img src={getBoardImage(boardId)} {...props} />
)

export default BoardImage
