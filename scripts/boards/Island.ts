import {
  getConveyor,
  getEmptyBoard,
  getGear,
  getHole,
  getRepair,
  setCell,
  setWall,
} from "../../client/src/common/roborally/model/BoardData"
import {
  Direction,
  getPos,
  Rotation,
} from "../../client/src/common/roborally/model/Position"

let board = getEmptyBoard(12, 12)

board = setWall(board, getPos(0, 2), Direction.WEST)
board = setWall(board, getPos(0, 4), Direction.WEST)
board = setWall(board, getPos(0, 7), Direction.WEST)
board = setWall(board, getPos(0, 9), Direction.WEST)
board = setCell(board, getPos(0, 9), getRepair())

board = setCell(board, getPos(1, 1), getHole())
board = setCell(board, getPos(1, 2), getHole())
board = setCell(board, getPos(1, 9), getHole())
board = setCell(board, getPos(1, 10), getHole())

board = setWall(board, getPos(2, 0), Direction.NORTH)
board = setCell(board, getPos(2, 1), getHole())
board = setCell(board, getPos(2, 2), getGear(Rotation.RIGHT))
board = setCell(board, getPos(2, 3), getConveyor(Direction.NORTH))
board = setCell(board, getPos(2, 4), getConveyor(Direction.NORTH))
board = setCell(board, getPos(2, 5), getConveyor(Direction.NORTH))
board = setCell(board, getPos(2, 6), getConveyor(Direction.NORTH))
board = setCell(board, getPos(2, 7), getConveyor(Direction.NORTH))
board = setCell(board, getPos(2, 8), getConveyor(Direction.NORTH))
board = setCell(board, getPos(2, 9), getConveyor(Direction.WEST))
board = setCell(board, getPos(2, 10), getHole())
board = setWall(board, getPos(2, 11), Direction.SOUTH)

board = setCell(board, getPos(3, 2), getConveyor(Direction.EAST))
board = setCell(board, getPos(3, 3), getGear(Rotation.LEFT))
board = setCell(board, getPos(3, 4), getConveyor(Direction.SOUTH))
board = setWall(board, getPos(3, 5), Direction.WEST)
board = setCell(board, getPos(3, 5), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(3, 6), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(3, 7), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(3, 8), getGear(Rotation.LEFT))
board = setCell(board, getPos(3, 9), getConveyor(Direction.WEST))

board = setWall(board, getPos(4, 0), Direction.NORTH)
board = setCell(board, getPos(4, 2), getConveyor(Direction.EAST))
board = setCell(board, getPos(4, 3), getConveyor(Direction.WEST))
board = setCell(board, getPos(4, 5), getConveyor(Direction.WEST, Rotation.LEFT))
board = setCell(board, getPos(4, 6), getHole())
board = setCell(board, getPos(4, 7), getHole())
board = setCell(board, getPos(4, 8), getConveyor(Direction.EAST))
board = setCell(board, getPos(4, 9), getConveyor(Direction.WEST))
board = setWall(board, getPos(4, 11), Direction.SOUTH)

board = setCell(board, getPos(5, 2), getConveyor(Direction.EAST))
board = setWall(board, getPos(5, 3), Direction.NORTH)
board = setCell(board, getPos(5, 3), getConveyor(Direction.WEST))
board = setCell(board, getPos(5, 5), getConveyor(Direction.WEST))
board = setCell(board, getPos(5, 7), getHole())
board = setCell(board, getPos(5, 8), getConveyor(Direction.EAST))
board = setWall(board, getPos(5, 9), Direction.NORTH)
board = setCell(board, getPos(5, 9), getConveyor(Direction.WEST))

board = setCell(board, getPos(6, 2), getConveyor(Direction.EAST))
board = setCell(board, getPos(6, 3), getConveyor(Direction.WEST))
board = setCell(board, getPos(6, 4), getHole())
board = setCell(board, getPos(6, 5), getRepair())
board = setCell(board, getPos(6, 6), getConveyor(Direction.EAST))
board = setCell(board, getPos(6, 8), getConveyor(Direction.EAST))
board = setCell(board, getPos(6, 9), getConveyor(Direction.WEST))

board = setWall(board, getPos(7, 0), Direction.NORTH)
board = setCell(board, getPos(7, 2), getConveyor(Direction.EAST))
board = setCell(board, getPos(7, 3), getConveyor(Direction.WEST))
board = setCell(board, getPos(7, 4), getHole())
board = setCell(board, getPos(7, 5), getHole())
board = setCell(board, getPos(7, 6), getConveyor(Direction.EAST, Rotation.LEFT))
board = setCell(board, getPos(7, 8), getConveyor(Direction.EAST))
board = setCell(board, getPos(7, 9), getConveyor(Direction.WEST))
board = setWall(board, getPos(7, 11), Direction.SOUTH)

board = setCell(board, getPos(8, 2), getConveyor(Direction.EAST))
board = setCell(board, getPos(8, 3), getGear(Rotation.LEFT))
board = setCell(board, getPos(8, 4), getConveyor(Direction.NORTH))
board = setCell(board, getPos(8, 5), getConveyor(Direction.NORTH))
board = setCell(board, getPos(8, 6), getConveyor(Direction.NORTH))
board = setCell(board, getPos(8, 7), getConveyor(Direction.NORTH))
board = setCell(board, getPos(8, 8), getGear(Rotation.LEFT))
board = setCell(board, getPos(8, 9), getConveyor(Direction.WEST))

board = setWall(board, getPos(9, 0), Direction.NORTH)
board = setCell(board, getPos(9, 1), getHole())
board = setCell(board, getPos(9, 2), getGear(Rotation.RIGHT))
board = setCell(board, getPos(9, 3), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(9, 4), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(9, 5), getConveyor(Direction.SOUTH))
board = setWall(board, getPos(9, 6), Direction.WEST)
board = setCell(board, getPos(9, 6), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(9, 7), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(9, 8), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(9, 9), getConveyor(Direction.SOUTH))
board = setCell(board, getPos(9, 10), getHole())
board = setWall(board, getPos(9, 11), Direction.SOUTH)

board = setCell(board, getPos(10, 1), getHole())
board = setCell(board, getPos(10, 2), getHole())
board = setCell(board, getPos(10, 9), getHole())
board = setCell(board, getPos(10, 10), getHole())

board = setCell(board, getPos(11, 0), getRepair())
board = setWall(board, getPos(11, 2), Direction.EAST)
board = setWall(board, getPos(11, 4), Direction.EAST)
board = setWall(board, getPos(11, 7), Direction.EAST)
board = setWall(board, getPos(11, 9), Direction.EAST)

export const BOARD_ISLAND = board
