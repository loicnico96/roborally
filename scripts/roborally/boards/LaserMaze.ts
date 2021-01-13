import { BoardBuilder } from "common/roborally/model/BoardBuilder"
import { Direction } from "common/roborally/model/Position"

const builder = BoardBuilder.emptyBoard(12, 12)

builder.addCheckpoint(3, 1)
builder.addCheckpoint(8, 4)
builder.addCheckpoint(9, 7)
builder.addCheckpoint(4, 9)

// Row 0

// Pos (0, 0)
builder.pos(0, 0).wall(Direction.EAST)

// Pos (1, 0)
builder.pos(1, 0).conveyor(Direction.SOUTH)

// Pos (2, 0)
builder.pos(2, 0).laserWall(Direction.NORTH, 2)

// Pos (3, 0)
builder.pos(3, 0).repair()

// Pos (4, 0)
builder.pos(4, 0).wall(Direction.NORTH)

// Pos (5, 0)
builder.pos(5, 0).conveyor(Direction.SOUTH)

// Pos (6, 0)
builder.pos(6, 0).conveyor(Direction.NORTH, true)

// Pos (7, 0)
builder.pos(7, 0).conveyor(Direction.WEST).laserWall(Direction.NORTH, 3)

// Pos (8, 0)
builder.pos(8, 0).conveyor(Direction.WEST, true)

// Pos (9, 0)
builder.pos(9, 0).conveyor(Direction.WEST).wall(Direction.NORTH)

// Pos (10, 0)
builder.pos(10, 0).conveyor(Direction.WEST, true)

// Pos (11, 0)
builder.pos(11, 0).hole()

// Row 1

// Pos (0, 1)
builder.pos(0, 1).conveyor(Direction.WEST)

// Pos (1, 1)
builder.pos(1, 1).conveyor(Direction.SOUTH).pusherWall(Direction.EAST, [2, 4])

// Pos (2, 1)
builder.pos(2, 1).wall(Direction.SOUTH, Direction.WEST)

// Pos (3, 1)
builder.pos(3, 1)

// Pos (4, 1)
builder.pos(4, 1).wall(Direction.EAST)

// Pos (5, 1)
builder.pos(5, 1).wall(Direction.SOUTH).hole()

// Pos (6, 1)
builder.pos(6, 1).conveyor(Direction.NORTH)

// Pos (7, 1)
builder.pos(7, 1).wall(Direction.SOUTH)

// Pos (8, 1)
builder.pos(8, 1).wall(Direction.EAST).laserWall(Direction.WEST, 2)

// Pos (9, 1)
builder.pos(9, 1).wall(Direction.NORTH)

// Pos (10, 1)
builder.pos(10, 1).conveyor(Direction.NORTH, true)

// Pos (11, 1)
builder.pos(11, 1).conveyor(Direction.WEST)

// Row 2

// Pos (0, 2)
builder.pos(0, 2).laserWall(Direction.WEST, 1)

// Pos (1, 2)
builder.pos(1, 2).conveyor(Direction.SOUTH)

// Pos (2, 2)
builder.pos(2, 2).wall(Direction.WEST)

// Pos (3, 2)
builder.pos(3, 2).wall(Direction.SOUTH)

// Pos (4, 2)
builder.pos(4, 2)

// Pos (5, 2)
builder.pos(5, 2)

// Pos (6, 2)
builder.pos(6, 2).conveyor(Direction.NORTH, true)

// Pos (7, 2)
builder.pos(7, 2).conveyor(Direction.WEST, true)

// Pos (8, 2)
builder.pos(8, 2)

// Pos (9, 2)
builder.pos(9, 2)

// Pos (10, 2)
builder.pos(10, 2).laserWall(Direction.WEST, 2)

// Pos (11, 2)
builder.pos(11, 2).wall(Direction.EAST)

// Row 3

// Pos (0, 3)
builder.pos(0, 3)

// Pos (1, 3)
builder.pos(1, 3).conveyor(Direction.SOUTH)

// Pos (2, 3)
builder.pos(2, 3)

// Pos (3, 3)
builder.pos(3, 3).wall(Direction.EAST)

// Pos (4, 3)
builder.pos(4, 3).laserWall(Direction.SOUTH, 2)

// Pos (5, 3)
builder.pos(5, 3).wall(Direction.SOUTH, Direction.WEST)

// Pos (6, 3)
builder.pos(6, 3).conveyor(Direction.EAST, true).laserWall(Direction.NORTH, 1)

// Pos (7, 3)
builder.pos(7, 3).conveyor(Direction.NORTH, true)

// Pos (8, 3)
builder.pos(8, 3).wall(Direction.SOUTH).laserWall(Direction.NORTH, 2)

// Pos (9, 3)
builder.pos(9, 3).wall(Direction.SOUTH)

// Pos (10, 3)
builder.pos(10, 3)

// Pos (11, 3)
builder.pos(11, 3).wall(Direction.NORTH)

// Row 4

// Pos (0, 4)
builder.pos(0, 4).wall(Direction.WEST)

// Pos (1, 4)
builder.pos(1, 4).conveyor(Direction.SOUTH).laserWall(Direction.EAST, 2)

// Pos (2, 4)
builder.pos(2, 4).wall(Direction.EAST)

// Pos (3, 4)
builder.pos(3, 4)

// Pos (4, 4)
builder.pos(4, 4).laserWall(Direction.SOUTH, 1)

// Pos (5, 4)
builder.pos(5, 4).doubleRepair()

// Pos (6, 4)
builder.pos(6, 4).conveyor(Direction.NORTH)

// Pos (7, 4)
builder.pos(7, 4).wall(Direction.WEST)

// Pos (8, 4)
builder.pos(8, 4)

// Pos (9, 4)
builder.pos(9, 4).hole()

// Pos (10, 4)
builder.pos(10, 4).conveyor(Direction.WEST, true)

// Pos (11, 4)
builder.pos(11, 4).wall(Direction.EAST).laserWall(Direction.WEST, 3)

// Row 5

// Pos (0, 5)
builder.pos(0, 5).conveyor(Direction.WEST)

// Pos (1, 5)
builder.pos(1, 5).conveyor(Direction.WEST, true)

// Pos (2, 5)
builder.pos(2, 5)

// Pos (3, 5)
builder.pos(3, 5).wall(Direction.SOUTH)

// Pos (4, 5)
builder.pos(4, 5).laserWall(Direction.SOUTH, 2)

// Pos (5, 5)
builder.pos(5, 5).wall(Direction.EAST)

// Pos (6, 5)
builder.pos(6, 5).conveyor(Direction.NORTH)

// Pos (7, 5)
builder.pos(7, 5).wall(Direction.SOUTH, Direction.EAST)

// Pos (8, 5)
builder.pos(8, 5)

// Pos (9, 5)
builder.pos(9, 5)

// Pos (10, 5)
builder.pos(10, 5).conveyor(Direction.NORTH, true)

// Pos (11, 5)
builder.pos(11, 5).conveyor(Direction.WEST)

// Row 6

// Pos (0, 6)
builder.pos(0, 6).conveyor(Direction.EAST)

// Pos (1, 6)
builder.pos(1, 6).conveyor(Direction.SOUTH, true)

// Pos (2, 6)
builder.pos(2, 6).laserWall(Direction.WEST, 1)

// Pos (3, 6)
builder.pos(3, 6)

// Pos (4, 6)
builder.pos(4, 6)

// Pos (5, 6)
builder.pos(5, 6)

// Pos (6, 6)
builder.pos(6, 6).conveyor(Direction.NORTH)

// Pos (7, 6)
builder.pos(7, 6)

// Pos (8, 6)
builder.pos(8, 6).wall(Direction.SOUTH)

// Pos (9, 6)
builder.pos(9, 6).laserWall(Direction.WEST, 2)

// Pos (10, 6)
builder.pos(10, 6).conveyor(Direction.EAST, true).wall(Direction.WEST)

// Pos (11, 6)
builder.pos(11, 6).conveyor(Direction.EAST)

// Row 7

// Pos (0, 7)
builder.pos(0, 7).wall(Direction.WEST)

// Pos (1, 7)
builder.pos(1, 7).conveyor(Direction.SOUTH)

// Pos (2, 7)
builder.pos(2, 7)

// Pos (3, 7)
builder.pos(3, 7).wall(Direction.NORTH)

// Pos (4, 7)
builder.pos(4, 7)

// Pos (5, 7)
builder.pos(5, 7).wall(Direction.NORTH)

// Pos (6, 7)
builder.pos(6, 7).conveyor(Direction.NORTH)

// Pos (7, 7)
builder.pos(7, 7).wall(Direction.SOUTH, Direction.WEST).doubleRepair()

// Pos (8, 7)
builder.pos(8, 7)

// Pos (9, 7)
builder.pos(9, 7)

// Pos (10, 7)
builder.pos(10, 7).conveyor(Direction.NORTH).laserWall(Direction.WEST, 1)

// Pos (11, 7)
builder.pos(11, 7).wall(Direction.EAST)

// Row 8

// Pos (0, 8)
builder.pos(0, 8)

// Pos (1, 8)
builder.pos(1, 8).hole()

// Pos (2, 8)
builder.pos(2, 8).wall(Direction.WEST)

// Pos (3, 8)
builder.pos(3, 8).wall(Direction.NORTH)

// Pos (4, 8)
builder.pos(4, 8)

// Pos (5, 8)
builder.pos(5, 8).wall(Direction.WEST).laserWall(Direction.EAST, 2)

// Pos (6, 8)
builder.pos(6, 8).conveyor(Direction.NORTH, true).wall(Direction.SOUTH)

// Pos (7, 8)
builder.pos(7, 8).conveyor(Direction.WEST, true)

// Pos (8, 8)
builder.pos(8, 8).laserWall(Direction.SOUTH, 1)

// Pos (9, 8)
builder.pos(9, 8).hole()

// Pos (10, 8)
builder.pos(10, 8).conveyor(Direction.NORTH)

// Pos (11, 8)
builder.pos(11, 8)

// Row 9

// Pos (0, 9)
builder.pos(0, 9).wall(Direction.WEST)

// Pos (1, 9)
builder.pos(1, 9).wall(Direction.NORTH).laserWall(Direction.SOUTH, 1)

// Pos (2, 9)
builder.pos(2, 9)

// Pos (3, 9)
builder.pos(3, 9).wall(Direction.NORTH).laserWall(Direction.SOUTH, 1)

// Pos (4, 9)
builder.pos(4, 9)

// Pos (5, 9)
builder.pos(5, 9)

// Pos (6, 9)
builder.pos(6, 9).conveyor(Direction.EAST, true)

// Pos (7, 9)
builder.pos(7, 9).conveyor(Direction.NORTH, true)

// Pos (8, 9)
builder.pos(8, 9)

// Pos (9, 9)
builder.pos(9, 9).laserWall(Direction.WEST, 1)

// Pos (10, 9)
builder.pos(10, 9).conveyor(Direction.NORTH)

// Pos (11, 9)
builder.pos(11, 9).wall(Direction.EAST)

// Row 10

// Pos (0, 10)
builder.pos(0, 10).conveyor(Direction.EAST)

// Pos (1, 10)
builder.pos(1, 10).conveyor(Direction.SOUTH, true).wall(Direction.EAST)

// Pos (2, 10)
builder.pos(2, 10)

// Pos (3, 10)
builder.pos(3, 10).wall(Direction.WEST)

// Pos (4, 10)
builder.pos(4, 10).hole()

// Pos (5, 10)
builder.pos(5, 10).conveyor(Direction.SOUTH)

// Pos (6, 10)
builder.pos(6, 10).conveyor(Direction.NORTH)

// Pos (7, 10)
builder.pos(7, 10).hole()

// Pos (8, 10)
builder.pos(8, 10)

// Pos (9, 10)
builder.pos(9, 10).wall(Direction.EAST)

// Pos (10, 10)
builder.pos(10, 10).conveyor(Direction.NORTH).pusherWall(Direction.WEST, [2, 4])

// Pos (11, 10)
builder.pos(11, 10).conveyor(Direction.EAST)

// Row 11

// Pos (0, 11)
builder.pos(0, 11).wall(Direction.NORTH, Direction.EAST)

// Pos (1, 11)
builder.pos(1, 11).conveyor(Direction.SOUTH)

// Pos (2, 11)
builder.pos(2, 11).laserWall(Direction.SOUTH, 1)

// Pos (3, 11)
builder.pos(3, 11)

// Pos (4, 11)
builder.pos(4, 11).hole().wall(Direction.SOUTH)

// Pos (5, 11)
builder.pos(5, 11).conveyor(Direction.SOUTH)

// Pos (6, 11)
builder.pos(6, 11).conveyor(Direction.NORTH)

// Pos (7, 11)
builder.pos(7, 11).hole().wall(Direction.SOUTH)

// Pos (8, 11)
builder.pos(8, 11).pusherWall(Direction.EAST, [5])

// Pos (9, 11)
builder.pos(9, 11).wall(Direction.SOUTH)

// Pos (10, 11)
builder.pos(10, 11).conveyor(Direction.NORTH)

// Pos (11, 11)
builder.pos(11, 11).repair()

// Export

export default builder.build()
