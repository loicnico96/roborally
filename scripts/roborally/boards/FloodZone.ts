import { BoardBuilder } from "common/roborally/model/BoardBuilder"
import { Direction } from "common/roborally/model/Position"

const builder = BoardBuilder.emptyBoard(12, 12)

// Row 0

// Pos (0, 0)
builder.pos(0, 0)

// Pos (0, 1)
builder.pos(0, 1).conveyor(Direction.SOUTH)

// Pos (0, 2)
builder.pos(0, 2).wall(Direction.NORTH)

// Pos (0, 3)
builder.pos(0, 3).water()

// Pos (0, 4)
builder.pos(0, 4).wall(Direction.NORTH)

// Pos (0, 5)
builder.pos(0, 5).conveyor(Direction.EAST, true)

// Pos (0, 6)
builder.pos(0, 6).conveyor(Direction.EAST)

// Pos (0, 7)
builder.pos(0, 7).conveyor(Direction.EAST).wall(Direction.NORTH)

// Pos (0, 8)
builder.pos(0, 8).conveyor(Direction.EAST, true)

// Pos (0, 9)
builder.pos(0, 9).wall(Direction.SOUTH).laserWall(Direction.NORTH, 2)

// Pos (0, 10)
builder.pos(0, 10).conveyor(Direction.WEST)

// Pos (0, 11)
builder.pos(0, 11).conveyor(Direction.WEST, true)

// Row 1

// Pos (1, 0)
builder.pos(1, 0).conveyor(Direction.WEST)

// Pos (1, 1)
builder.pos(1, 1).repair()

// Pos (1, 2)
builder.pos(1, 2).water()

// Pos (1, 3)
builder.pos(1, 3).water()

// Pos (1, 4)
builder.pos(1, 4).water()

// Pos (1, 5)
builder.pos(1, 5).water()

// Pos (1, 6)
builder.pos(1, 6).water()

// Pos (1, 7)
builder.pos(1, 7)

// Pos (1, 8)
builder.pos(1, 8).water().hole()

// Pos (1, 9)
builder.pos(1, 9).water()

// Pos (1, 10)
builder.pos(1, 10).water()

// Pos (1, 11)
builder.pos(1, 11).conveyor(Direction.NORTH, true)

// Row 2

// Pos (2, 0)
builder.pos(2, 0).wall(Direction.WEST)

// Pos (2, 1)
builder.pos(2, 1).water()

// Pos (2, 2)
builder.pos(2, 2).water()

// Pos (2, 3)
builder.pos(2, 3)

// Pos (2, 4)
builder.pos(2, 4)

// Pos (2, 5)
builder.pos(2, 5).wall(Direction.NORTH)

// Pos (2, 6)
builder.pos(2, 6).water()

// Pos (2, 7)
builder.pos(2, 7).water()

// Pos (2, 8)
builder.pos(2, 8)

// Pos (2, 9)
builder.pos(2, 9)

// Pos (2, 10)
builder.pos(2, 10).water()

// Pos (2, 11)
builder.pos(2, 11).wall(Direction.EAST)

// Row 3

// Pos (3, 0)
builder.pos(3, 0).water()

// Pos (3, 1)
builder.pos(3, 1).water()

// Pos (3, 2)
builder.pos(3, 2).water()

// Pos (3, 3)
builder.pos(3, 3).water()

// Pos (3, 4)
builder.pos(3, 4).water()

// Pos (3, 5)
builder.pos(3, 5).water().conveyor(Direction.SOUTH)

// Pos (3, 6)
builder.pos(3, 6).water()

// Pos (3, 7)
builder.pos(3, 7).water()

// Pos (3, 8)
builder.pos(3, 8).water()

// Pos (3, 9)
builder.pos(3, 9)

// Pos (3, 10)
builder.pos(3, 10)

// Pos (3, 11)
builder.pos(3, 11)

// Row 4

// Pos (4, 0)
builder.pos(4, 0).water().wall(Direction.WEST)

// Pos (4, 1)
builder.pos(4, 1).water().hole()

// Pos (4, 2)
builder.pos(4, 2)

// Pos (4, 3)
builder.pos(4, 3).water()

// Pos (4, 4)
builder.pos(4, 4)

// Pos (4, 5)
builder.pos(4, 5).water().conveyor(Direction.SOUTH)

// Pos (4, 6)
builder.pos(4, 6).water()

// Pos (4, 7)
builder.pos(4, 7)

// Pos (4, 8)
builder.pos(4, 8).water()

// Pos (4, 9)
builder.pos(4, 9).water()

// Pos (4, 10)
builder.pos(4, 10)

// Pos (4, 11)
builder.pos(4, 11).wall(Direction.EAST)

// Row 5

// Pos (5, 0)
builder.pos(5, 0).water()

// Pos (5, 1)
builder.pos(5, 1).water()

// Pos (5, 2)
builder.pos(5, 2).water()

// Pos (5, 3)
builder.pos(5, 3).water()

// Pos (5, 4)
builder.pos(5, 4)

// Pos (5, 5)
builder.pos(5, 5).water().conveyor(Direction.SOUTH)

// Pos (5, 6)
builder.pos(5, 6)

// Pos (5, 7)
builder.pos(5, 7)

// Pos (5, 8)
builder.pos(5, 8).wall(Direction.SOUTH)

// Pos (5, 9)
builder.pos(5, 9).water()

// Pos (5, 10)
builder.pos(5, 10).water()

// Pos (5, 11)
builder.pos(5, 11).conveyor(Direction.WEST)

// Row 6

// Pos (6, 0)
builder.pos(6, 0).water()

// Pos (6, 1)
builder.pos(6, 1).water()

// Pos (6, 2)
builder.pos(6, 2).water().repair()

// Pos (6, 3)
builder.pos(6, 3).water()

// Pos (6, 4)
builder.pos(6, 4).water()

// Pos (6, 5)
builder.pos(6, 5).water().conveyor(Direction.SOUTH)

// Pos (6, 6)
builder.pos(6, 6).water()

// Pos (6, 7)
builder.pos(6, 7)

// Pos (6, 8)
builder.pos(6, 8).water()

// Pos (6, 9)
builder.pos(6, 9).water()

// Pos (6, 10)
builder.pos(6, 10).water()

// Pos (6, 11)
builder.pos(6, 11).water().conveyor(Direction.EAST)

// Row 7

// Pos (7, 0)
builder.pos(7, 0).water().conveyor(Direction.EAST).wall(Direction.WEST)

// Pos (7, 1)
builder.pos(7, 1).water().conveyor(Direction.EAST)

// Pos (7, 2)
builder.pos(7, 2).water().conveyor(Direction.EAST)

// Pos (7, 3)
builder.pos(7, 3).water().conveyor(Direction.EAST)

// Pos (7, 4)
builder.pos(7, 4).water().conveyor(Direction.EAST)

// Pos (7, 5)
builder.pos(7, 5).water().hole()

// Pos (7, 6)
builder.pos(7, 6).water().repair()

// Pos (7, 7)
builder.pos(7, 7).water()

// Pos (7, 8)
builder.pos(7, 8).water()

// Pos (7, 9)
builder.pos(7, 9)

// Pos (7, 10)
builder.pos(7, 10)

// Pos (7, 11)
builder.pos(7, 11).wall(Direction.EAST)

// Row 8

// Pos (8, 0)
builder.pos(8, 0).water()

// Pos (8, 1)
builder.pos(8, 1).water()

// Pos (8, 2)
builder.pos(8, 2).water()

// Pos (8, 3)
builder.pos(8, 3).water()

// Pos (8, 4)
builder.pos(8, 4).water()

// Pos (8, 5)
builder.pos(8, 5).water()

// Pos (8, 6)
builder.pos(8, 6).water()

// Pos (8, 7)
builder.pos(8, 7)

// Pos (8, 8)
builder.pos(8, 8).water()

// Pos (8, 9)
builder.pos(8, 9).water()

// Pos (8, 10)
builder.pos(8, 10).water()

// Pos (8, 11)
builder.pos(8, 11)

// Row 9

// Pos (9, 0)
builder.pos(9, 0).water().wall(Direction.WEST)

// Pos (9, 1)
builder.pos(9, 1).water()

// Pos (9, 2)
builder.pos(9, 2)

// Pos (9, 3)
builder.pos(9, 3).water()

// Pos (9, 4)
builder.pos(9, 4)

// Pos (9, 5)
builder.pos(9, 5).water()

// Pos (9, 6)
builder.pos(9, 6).water()

// Pos (9, 7)
builder.pos(9, 7)

// Pos (9, 8)
builder.pos(9, 8).wall(Direction.SOUTH)

// Pos (9, 9)
builder.pos(9, 9).wall(Direction.SOUTH)

// Pos (9, 10)
builder.pos(9, 10)

// Pos (9, 11)
builder.pos(9, 11).wall(Direction.EAST)

// Row 10

// Pos (10, 0)
builder.pos(10, 0).water()

// Pos (10, 1)
builder.pos(10, 1).water()

// Pos (10, 2)
builder.pos(10, 2).laserWall(Direction.WEST, 2)

// Pos (10, 3)
builder.pos(10, 3).water()

// Pos (10, 4)
builder.pos(10, 4).wall(Direction.EAST)

// Pos (10, 5)
builder.pos(10, 5).water()

// Pos (10, 6)
builder.pos(10, 6).water()

// Pos (10, 7)
builder.pos(10, 7).water()

// Pos (10, 8)
builder.pos(10, 8).water()

// Pos (10, 9)
builder.pos(10, 9).water()

// Pos (10, 10)
builder.pos(10, 10).conveyor(Direction.EAST, true)

// Pos (10, 11)
builder.pos(10, 11).conveyor(Direction.EAST)

// Row 11

// Pos (11, 0)
builder.pos(11, 0)

// Pos (11, 1)
builder.pos(11, 1).water()

// Pos (11, 2)
builder.pos(11, 2).wall(Direction.SOUTH)

// Pos (11, 3)
builder.pos(11, 3)

// Pos (11, 4)
builder.pos(11, 4).wall(Direction.SOUTH)

// Pos (11, 5)
builder.pos(11, 5).conveyor(Direction.SOUTH, true)

// Pos (11, 6)
builder.pos(11, 6).conveyor(Direction.WEST, true)

// Pos (11, 7)
builder.pos(11, 7).wall(Direction.SOUTH)

// Pos (11, 8)
builder.pos(11, 8)

// Pos (11, 9)
builder.pos(11, 9).laserWall(Direction.SOUTH, 2)

// Pos (11, 10)
builder.pos(11, 10).conveyor(Direction.NORTH)

// Pos (11, 11)
builder.pos(11, 11)

// Export

export default builder.build()
