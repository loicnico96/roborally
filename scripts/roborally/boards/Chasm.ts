import { BoardBuilder } from "common/roborally/model/BoardBuilder"
import { Direction } from "common/roborally/model/Position"

const builder = BoardBuilder.emptyBoard(12, 12)

builder.addCheckpoint(4, 8)
builder.addCheckpoint(5, 3)
builder.addCheckpoint(2, 7)
builder.addCheckpoint(9, 5)

// Row 0

// Pos (0, 0)
builder.pos(0, 0).hole()

// Pos (1, 0)
builder.pos(1, 0).hole()

// Pos (2, 0)
builder.pos(2, 0).hole().wall(Direction.NORTH)

// Pos (3, 0)
builder.pos(3, 0).hole()

// Pos (4, 0)
builder.pos(4, 0).wall(Direction.NORTH)

// Pos (5, 0)
builder.pos(5, 0).conveyor(Direction.EAST, true)

// Pos (6, 0)
builder.pos(6, 0).conveyor(Direction.NORTH, true)

// Pos (7, 0)
builder.pos(7, 0).wall(Direction.NORTH)

// Pos (8, 0)
builder.pos(8, 0).teleporter()

// Pos (9, 0)
builder.pos(9, 0).hole().wall(Direction.NORTH)

// Pos (10, 0)
builder.pos(10, 0).hole()

// Pos (11, 0)
builder.pos(11, 0).repair()

// Row 1

// Pos (0, 1)
builder.pos(0, 1).hole()

// Pos (1, 1)
builder.pos(1, 1).doubleRepair()

// Pos (2, 1)
builder.pos(2, 1).teleporter()

// Pos (3, 1)
builder.pos(3, 1).hole()

// Pos (4, 1)
builder.pos(4, 1).teleporter()

// Pos (5, 1)
builder.pos(5, 1)

// Pos (6, 1)
builder.pos(6, 1)

// Pos (7, 1)
builder.pos(7, 1).hole()

// Pos (8, 1)
builder.pos(8, 1)

// Pos (9, 1)
builder.pos(9, 1).hole()

// Pos (10, 1)
builder.pos(10, 1).hole()

// Pos (11, 1)
builder.pos(11, 1).teleporter()

// Row 2

// Pos (0, 2)
builder.pos(0, 2).hole().wall(Direction.WEST)

// Pos (1, 2)
builder.pos(1, 2).teleporter()

// Pos (2, 2)
builder.pos(2, 2)

// Pos (3, 2)
builder.pos(3, 2).hole()

// Pos (4, 2)
builder.pos(4, 2).hole()

// Pos (5, 2)
builder.pos(5, 2).hole()

// Pos (6, 2)
builder.pos(6, 2).hole()

// Pos (7, 2)
builder.pos(7, 2).hole()

// Pos (8, 2)
builder.pos(8, 2).hole()

// Pos (9, 2)
builder.pos(9, 2).hole()

// Pos (10, 2)
builder.pos(10, 2).hole()

// Pos (11, 2)
builder.pos(11, 2).hole()

// Row 3

// Pos (0, 3)
builder.pos(0, 3).hole()

// Pos (1, 3)
builder.pos(1, 3)

// Pos (2, 3)
builder.pos(2, 3).hole()

// Pos (3, 3)
builder.pos(3, 3).hole()

// Pos (4, 3)
builder.pos(4, 3)

// Pos (5, 3)
builder.pos(5, 3)

// Pos (6, 3)
builder.pos(6, 3)

// Pos (7, 3)
builder.pos(7, 3).teleporter()

// Pos (8, 3)
builder.pos(8, 3).hole()

// Pos (9, 3)
builder.pos(9, 3).teleporter()

// Pos (10, 3)
builder.pos(10, 3)

// Pos (11, 3)
builder.pos(11, 3).teleporter()

// Row 4

// Pos (0, 4)
builder.pos(0, 4).hole().wall(Direction.WEST)

// Pos (1, 4)
builder.pos(1, 4).conveyor(Direction.SOUTH, true)

// Pos (2, 4)
builder.pos(2, 4).conveyor(Direction.WEST, true)

// Pos (3, 4)
builder.pos(3, 4).hole()

// Pos (4, 4)
builder.pos(4, 4).teleporter()

// Pos (5, 4)
builder.pos(5, 4)

// Pos (6, 4)
builder.pos(6, 4).doubleRepair()

// Pos (7, 4)
builder.pos(7, 4)

// Pos (8, 4)
builder.pos(8, 4).hole()

// Pos (9, 4)
builder.pos(9, 4).hole()

// Pos (10, 4)
builder.pos(10, 4).hole()

// Pos (11, 4)
builder.pos(11, 4).wall(Direction.EAST)

// Row 5

// Pos (0, 5)
builder.pos(0, 5).conveyor(Direction.WEST)

// Pos (1, 5)
builder.pos(1, 5).conveyor(Direction.WEST, true)

// Pos (2, 5)
builder.pos(2, 5).conveyor(Direction.NORTH)

// Pos (3, 5)
builder.pos(3, 5).hole()

// Pos (4, 5)
builder.pos(4, 5).hole()

// Pos (5, 5)
builder.pos(5, 5).hole()

// Pos (6, 5)
builder.pos(6, 5).hole()

// Pos (7, 5)
builder.pos(7, 5).hole()

// Pos (8, 5)
builder.pos(8, 5).hole()

// Pos (9, 5)
builder.pos(9, 5)

// Pos (10, 5)
builder.pos(10, 5).conveyor(Direction.SOUTH, true)

// Pos (11, 5)
builder.pos(11, 5).conveyor(Direction.WEST)

// Row 6

// Pos (0, 6)
builder.pos(0, 6).conveyor(Direction.EAST)

// Pos (1, 6)
builder.pos(1, 6).conveyor(Direction.EAST)

// Pos (2, 6)
builder.pos(2, 6).conveyor(Direction.NORTH, true)

// Pos (3, 6)
builder.pos(3, 6).teleporter()

// Pos (4, 6)
builder.pos(4, 6).hole()

// Pos (5, 6)
builder.pos(5, 6).teleporter()

// Pos (6, 6)
builder.pos(6, 6)

// Pos (7, 6)
builder.pos(7, 6).teleporter()

// Pos (8, 6)
builder.pos(8, 6).hole()

// Pos (9, 6)
builder.pos(9, 6).teleporter()

// Pos (10, 6)
builder.pos(10, 6).conveyor(Direction.EAST, true)

// Pos (11, 6)
builder.pos(11, 6).conveyor(Direction.EAST)

// Row 7

// Pos (0, 7)
builder.pos(0, 7).hole().wall(Direction.WEST)

// Pos (1, 7)
builder.pos(1, 7).teleporter()

// Pos (2, 7)
builder.pos(2, 7)

// Pos (3, 7)
builder.pos(3, 7)

// Pos (4, 7)
builder.pos(4, 7).hole()

// Pos (5, 7)
builder.pos(5, 7).hole()

// Pos (6, 7)
builder.pos(6, 7).hole()

// Pos (7, 7)
builder.pos(7, 7).hole()

// Pos (8, 7)
builder.pos(8, 7).hole()

// Pos (9, 7)
builder.pos(9, 7).doubleRepair()

// Pos (10, 7)
builder.pos(10, 7).hole()

// Pos (11, 7)
builder.pos(11, 7).hole()

// Row 8

// Pos (0, 8)
builder.pos(0, 8).hole()

// Pos (1, 8)
builder.pos(1, 8).hole()

// Pos (2, 8)
builder.pos(2, 8).hole()

// Pos (3, 8)
builder.pos(3, 8).hole()

// Pos (4, 8)
builder.pos(4, 8)

// Pos (5, 8)
builder.pos(5, 8).teleporter()

// Pos (6, 8)
builder.pos(6, 8).hole()

// Pos (7, 8)
builder.pos(7, 8).hole()

// Pos (8, 8)
builder.pos(8, 8).doubleRepair()

// Pos (9, 8)
builder.pos(9, 8).hole()

// Pos (10, 8)
builder.pos(10, 8).hole()

// Pos (11, 8)
builder.pos(11, 8)

// Row 9

// Pos (0, 9)
builder.pos(0, 9).teleporter().wall(Direction.WEST)

// Pos (1, 9)
builder.pos(1, 9).hole()

// Pos (2, 9)
builder.pos(2, 9).hole()

// Pos (3, 9)
builder.pos(3, 9).hole()

// Pos (4, 9)
builder.pos(4, 9).hole()

// Pos (5, 9)
builder.pos(5, 9).conveyor(Direction.SOUTH, true)

// Pos (6, 9)
builder.pos(6, 9).conveyor(Direction.WEST, true)

// Pos (7, 9)
builder.pos(7, 9).hole()

// Pos (8, 9)
builder.pos(8, 9).teleporter()

// Pos (9, 9)
builder.pos(9, 9).hole()

// Pos (10, 9)
builder.pos(10, 9).hole()

// Pos (11, 9)
builder.pos(11, 9).teleporter().wall(Direction.EAST)

// Row 10

// Pos (0, 10)
builder.pos(0, 10).conveyor(Direction.NORTH, true)

// Pos (1, 10)
builder.pos(1, 10).repair()

// Pos (2, 10)
builder.pos(2, 10).hole()

// Pos (3, 10)
builder.pos(3, 10).hole()

// Pos (4, 10)
builder.pos(4, 10).teleporter()

// Pos (5, 10)
builder.pos(5, 10).conveyor(Direction.SOUTH)

// Pos (6, 10)
builder.pos(6, 10).conveyor(Direction.NORTH)

// Pos (7, 10)
builder.pos(7, 10).hole()

// Pos (8, 10)
builder.pos(8, 10).hole()

// Pos (9, 10)
builder.pos(9, 10).hole()

// Pos (10, 10)
builder.pos(10, 10).conveyor(Direction.EAST, true)

// Pos (11, 10)
builder.pos(11, 10).conveyor(Direction.EAST)

// Row 11

// Pos (0, 11)
builder.pos(0, 11)

// Pos (1, 11)
builder.pos(1, 11).conveyor(Direction.SOUTH)

// Pos (2, 11)
builder.pos(2, 11).hole().wall(Direction.SOUTH)

// Pos (3, 11)
builder.pos(3, 11).hole()

// Pos (4, 11)
builder.pos(4, 11).hole().wall(Direction.SOUTH)

// Pos (5, 11)
builder.pos(5, 11).conveyor(Direction.SOUTH)

// Pos (6, 11)
builder.pos(6, 11).conveyor(Direction.NORTH)

// Pos (7, 11)
builder.pos(7, 11).hole().wall(Direction.SOUTH)

// Pos (8, 11)
builder.pos(8, 11).teleporter()

// Pos (9, 11)
builder.pos(9, 11).wall(Direction.SOUTH)

// Pos (10, 11)
builder.pos(10, 11).conveyor(Direction.NORTH)

// Pos (11, 11)
builder.pos(11, 11)

// Export

export default builder.build()
