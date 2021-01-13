import { BoardBuilder } from "./BoardBuilder"
import { FeatureType, LaserType, WallType } from "./BoardData"
import { CellType } from "./CellData"
import {
  Direction,
  getPos,
  getReverseDir,
  Position,
  Rotation,
} from "./Position"

export class CellBuilder {
  private readonly builder: BoardBuilder
  private readonly pos: Position

  constructor(builder: BoardBuilder, pos: Position) {
    this.builder = builder
    this.pos = pos
  }

  conveyor(dir: Direction, turn: boolean = false): this {
    this.builder.addFeature(FeatureType.CONVEYOR)
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.CONVEYOR,
        dir,
        ...(turn === true && { turn }),
      },
    })
    return this
  }

  crusher(sequences: number[]): this {
    this.builder.addFeature(FeatureType.CRUSHER)
    this.builder.updateCell(this.pos, {
      $merge: {
        crush: sequences.map(seq => seq - 1),
      },
    })
    return this
  }

  doubleRepair(): this {
    // TODO: For now it's just a normal repair site
    // TODO: Could be treated differently in the future
    return this.repair()
  }

  fastConveyor(dir: Direction, turn: boolean = false): this {
    this.builder.addFeature(FeatureType.CONVEYOR_FAST)
    this.builder.addFeature(FeatureType.CONVEYOR)
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.CONVEYOR_FAST,
        dir,
        ...(turn === true && { turn }),
      },
    })
    return this
  }

  flameWall(dir: Direction, distance: number, sequences: number[]): this {
    this.builder.addFeature(FeatureType.FLAME)
    this.builder.addLaser({
      type: LaserType.FLAME,
      damage: 2,
      dir: getReverseDir(dir),
      dis: distance,
      pos: this.pos,
      seq: sequences.map(seq => seq - 1),
    })
    // Add corresponding wall automatically
    return this.wall(dir)
  }

  gear(rot: Rotation): this {
    this.builder.addFeature(FeatureType.GEAR)
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.GEAR,
        rot,
      },
    })
    return this
  }

  hole(): this {
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.HOLE,
      },
    })
    return this
  }

  laserWall(dir: Direction, damage: number): this {
    this.builder.addFeature(FeatureType.LASER)
    this.builder.addLaser({
      type: LaserType.NORMAL,
      damage,
      dir: getReverseDir(dir),
      pos: this.pos,
    })
    // Add corresponding wall automatically
    return this.wall(dir)
  }

  // level(level: number): this {
  // 	this.builder.addFeature(FeatureType.LEVEL)
  // 	this.builder.updateCell(this.pos, {
  // 		$merge: {
  // 			level,
  // 		},
  // 	})
  // 	return this
  // }

  oil(): this {
    this.builder.addFeature(FeatureType.OIL)
    this.builder.updateCell(this.pos, {
      $merge: {
        oil: true,
      },
    })
    return this
  }

  portal(x: number, y: number): this {
    this.builder.addFeature(FeatureType.PORTAL)
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.PORTAL,
        pos: getPos(x, y),
      },
    })
    return this
  }

  pusherWall(dir: Direction, sequences: number[]): this {
    this.builder.addFeature(FeatureType.PUSHER)
    this.builder.updateCell(this.pos, {
      $merge: {
        push: sequences.map(seq => seq - 1),
        pushDir: getReverseDir(dir),
      },
    })
    // Add corresponding wall automatically
    return this.wall(dir)
  }

  // ramp(dir: Direction): this {
  // 	this.builder.addWall(this.pos, dir, WallType.RAMP, true)
  // 	return this
  // }

  randomizer(): this {
    this.builder.addFeature(FeatureType.RANDOM)
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.RANDOM,
      },
    })
    return this
  }

  repair(): this {
    this.builder.addFeature(FeatureType.REPAIR)
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.REPAIR,
      },
    })
    return this
  }

  // repulsor(dir: Direction): this {
  // 	this.builder.addFeature(FeatureType.REPULSOR)
  // 	this.builder.addWall(this.pos, dir, WallType.REPULSOR)
  // 	return this
  // }

  teleporter(): this {
    this.builder.addFeature(FeatureType.TELEPORT)
    this.builder.updateCell(this.pos, {
      $merge: {
        type: CellType.TELEPORT,
      },
    })
    return this
  }

  trap(sequences: number[]): this {
    this.builder.addFeature(FeatureType.TRAP)
    this.builder.updateCell(this.pos, {
      $merge: {
        trap: sequences.map(seq => seq - 1),
      },
    })
    return this
  }

  wall(...dirs: Direction[]): this {
    dirs.forEach(dir => this.builder.addWall(this.pos, dir, WallType.NORMAL))
    return this
  }

  water(): this {
    this.builder.addFeature(FeatureType.WATER)
    this.builder.updateCell(this.pos, {
      $merge: {
        water: true,
      },
    })
    return this
  }

  waterCurrent(dir: Direction): this {
    // TODO: For now it's just a normal conveyor with water
    // TODO: Could be treated differently in the future
    return this.water().conveyor(dir)
  }

  waterDrain(): this {
    // TODO: For now it's just a normal pit with water
    // TODO: Could be treated differently in the future
    return this.water().hole()
  }
}
