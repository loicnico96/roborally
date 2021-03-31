import React from "react"

import BoardArkhamAsylum from "assets/boards/ArkhamAsylum.png"
import BoardBlastFurnace from "assets/boards/BlastFurnace.png"
import BoardCanneryRow from "assets/boards/CanneryRow.png"
import BoardChasm from "assets/boards/Chasm.png"
import BoardChess from "assets/boards/Chess.png"
import BoardChopShop from "assets/boards/ChopShop.png"
import BoardCircuitTrap from "assets/boards/CircuitTrap.png"
import BoardCross from "assets/boards/Cross.png"
import BoardExchange from "assets/boards/Exchange.png"
import BoardFloodZone from "assets/boards/FloodZone.png"
import BoardGearBox from "assets/boards/GearBox.png"
import BoardIsland from "assets/boards/Island.png"
import BoardLaserMaze from "assets/boards/LaserMaze.png"
import BoardMachineShop from "assets/boards/MachineShop.png"
import BoardMaelstrom from "assets/boards/Maelstrom.png"
import BoardPitMaze from "assets/boards/PitMaze.png"
import BoardSpinZone from "assets/boards/SpinZone.png"
import BoardVault from "assets/boards/Vault.png"
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