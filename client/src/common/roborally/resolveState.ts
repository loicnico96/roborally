import { CellType } from "./model/CellData"
import { GamePhase } from "./model/RoborallyState"
import { resolveBoardMoves } from "./resolveBoardMoves"
import { resolveCheckpoints } from "./resolveCheckpoints"
// import { resolveCrushers } from "./resolveCrushers"
import {
  checkDamage,
  resolveBoardLasers,
  resolvePlayerLasers,
} from "./resolveLasers"
import { resolvePlayerActions } from "./resolvePlayerActions"
import { resolveRepairs } from "./resolveRepairs"
import { resolveRespawn } from "./resolveRespawn"
import { RoborallyContext } from "./RoborallyContext"
import { startNextTurn } from "./startNextTurn"

const SEQUENCE_COUNT = 5

async function setGamePhase(ctx: RoborallyContext, phase: GamePhase) {
  ctx.mergeState({ currentPlayer: null, phase })
  await ctx.post()
}

async function resolveTurnSequence(ctx: RoborallyContext, sequence: number) {
  await setGamePhase(ctx, GamePhase.RESOLVE_PLAYERS)
  await resolvePlayerActions(ctx, sequence)

  // TODO Enable when corresponding board is implemented
  // await setGamePhase(ctx, GamePhase.RESOLVE_CONVEYORS_FAST)
  // await resolveBoardMoves(ctx, [CellType.CONVEYOR_FAST])

  await setGamePhase(ctx, GamePhase.RESOLVE_CONVEYORS)
  await resolveBoardMoves(ctx, [CellType.CONVEYOR_FAST, CellType.CONVEYOR])

  // TODO Enable when corresponding board is implemented
  // await setGamePhase(ctx, GamePhase.RESOLVE_CRUSHERS)
  // await resolveCrushers(ctx, sequence)

  await setGamePhase(ctx, GamePhase.RESOLVE_GEARS)
  await resolveBoardMoves(ctx, [CellType.GEAR])

  await setGamePhase(ctx, GamePhase.RESOLVE_LASERS)
  await resolveBoardLasers(ctx)
  await resolvePlayerLasers(ctx)
  await checkDamage(ctx)

  await setGamePhase(ctx, GamePhase.RESOLVE_CHECKPOINTS)
  await resolveRepairs(ctx)
  await resolveCheckpoints(ctx)
}

async function resolveTurn(ctx: RoborallyContext) {
  for (let sequence = 0; sequence < SEQUENCE_COUNT; sequence++) {
    ctx.mergeState({ sequence })
    await ctx.post()
    await resolveTurnSequence(ctx, sequence)
  }

  await resolveRespawn(ctx)
  await startNextTurn(ctx)
}

export async function resolveState(ctx: RoborallyContext) {
  if (ctx.getPhase() === GamePhase.PROGRAM && ctx.allPlayersReady()) {
    await resolveTurn(ctx)
  }
}
