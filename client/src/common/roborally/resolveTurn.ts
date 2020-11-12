import update from "immutability-helper"
import { mapValues } from "common/utils/objects"
import { RoborallyState, GamePhase } from "./model/RoborallyState"
import {
  destroyPlayer,
  isAbleToMove,
  isAbleToRepair,
  isAffectedByCells,
  isAffectedByCheckpoint,
  isAffectedByHoles,
  repairPlayer,
  respawnPlayer,
  triggerPlayerCheckpoint,
} from "./model/RoborallyPlayer"
import { CardAction, getCardAction } from "./model/Card"
import { forEachAsync } from "common/utils/forEachAsync"
import {
  getDir,
  movePos,
  Direction,
  Rotation,
  isSamePos,
} from "./model/Position"
import { getWall, WallType } from "./model/Board"
import { PlayerId } from "common/model/GameStateBasic"
import { CellType } from "./model/CellData"
import { getOrderedPlayerActions } from "./resolvePlayerActions"
import { StateChangeHandler } from "common/GameContext"
import { RoborallyContext } from "./RoborallyContext"

export async function resolveTurn(
  initialState: RoborallyState,
  onStateChanged?: StateChangeHandler<RoborallyState>
): Promise<RoborallyState> {
  const ctx = new RoborallyContext(initialState, onStateChanged)

  if (ctx.getPhase() === GamePhase.PROGRAM) {
    await startResolving()

    for (let sequence = 0; sequence < 5; sequence++) {
      await resolveSequence(sequence)
    }

    await respawnPlayers()
    await startNextTurn()
  }

  return ctx.getState()

  async function startResolving() {
    ctx.updateState({
      players: players =>
        mapValues(players, player =>
          update(player, {
            cards: { $set: [] },
          })
        ),
      sequence: { $set: 0 },
    })
    await ctx.post()
  }

  async function respawnPlayers() {
    const updateCount = ctx.updatePlayers(player => {
      if (player.destroyed) {
        return respawnPlayer(player, ctx.state.checkpoints)
      } else {
        return false
      }
    })

    if (updateCount > 0) {
      await ctx.post()
    }
  }

  async function startNextTurn() {
    ctx.updateState({
      turn: turn => turn + 1,
      phase: { $set: GamePhase.STANDBY },
      players: players =>
        mapValues(players, player =>
          update(player, {
            damage: { $set: player.downNext ? 0 : player.damage },
            down: { $set: player.downNext },
            downNext: { $set: false },
            ready: { $set: false },
          })
        ),
    })
    await ctx.post()
  }

  async function resolveSequence(sequence: number) {
    ctx.updateState({
      sequence: { $set: sequence },
      phase: { $set: GamePhase.RESOLVE_PLAYERS },
      playerCurrent: { $set: null },
    })
    await ctx.post()
    await resolvePlayerActions(sequence)
    ctx.updateState({ phase: { $set: GamePhase.RESOLVE_CONVEYORS_FAST } })
    await ctx.post()
    await resolveBoardMoves([CellType.CONVEYOR_FAST])
    ctx.updateState({ phase: { $set: GamePhase.RESOLVE_CONVEYORS } })
    await ctx.post()
    await resolveBoardMoves([CellType.CONVEYOR_FAST, CellType.CONVEYOR])
    ctx.updateState({ phase: { $set: GamePhase.RESOLVE_GEARS } })
    await ctx.post()
    await resolveBoardMoves([CellType.GEAR])
    ctx.updateState({ phase: { $set: GamePhase.RESOLVE_LASERS } })
    await ctx.post()
    await resolveBoardLasers()
    await resolvePlayerLasers()
    ctx.updateState({ phase: { $set: GamePhase.RESOLVE_CHECKPOINTS } })
    await ctx.post()
    await resolveRepairs()
    await resolveCheckpoints()
  }

  async function resolvePlayerActions(sequence: number) {
    const playerActions = getOrderedPlayerActions(ctx.getState(), sequence)
    return forEachAsync(playerActions, async ({ playerId, card }) => {
      ctx.updateState({ playerCurrent: { $set: playerId } })
      await ctx.post()
      await resolvePlayerAction(playerId, getCardAction(card))
    })
  }

  async function resolvePlayerAction(playerId: PlayerId, action: CardAction) {
    switch (action) {
      case CardAction.MOVE_1:
        await movePlayer(playerId, getDir(ctx.getPlayer(playerId).rot), 1)
        break
      case CardAction.MOVE_2:
        await movePlayer(playerId, getDir(ctx.getPlayer(playerId).rot), 2)
        break
      case CardAction.MOVE_3:
        await movePlayer(playerId, getDir(ctx.getPlayer(playerId).rot), 3)
        break
      case CardAction.MOVE_BACK:
        await movePlayer(playerId, getDir(ctx.getPlayer(playerId).rot + 2), 1)
        break
      case CardAction.ROTATE_LEFT:
        ctx.updatePlayer(playerId, {
          rot: rot => rot + Rotation.LEFT,
        })
        await ctx.post()
        break
      case CardAction.ROTATE_RIGHT:
        ctx.updatePlayer(playerId, {
          rot: rot => rot + Rotation.RIGHT,
        })
        await ctx.post()
        break
      case CardAction.ROTATE_BACK:
        ctx.updatePlayer(playerId, {
          rot: rot => rot + Rotation.REVERSE,
        })
        await ctx.post()
        break
      default:
    }
  }

  async function checkHoles() {
    const updateCount = ctx.updatePlayers(player => {
      const { type } = ctx.getCell(player.pos)
      if (isAffectedByHoles(player) && type === CellType.HOLE) {
        return destroyPlayer(player)
      } else {
        return false
      }
    })

    if (updateCount > 0) {
      await ctx.post()
    }
  }

  async function resolveBoardMoves(activeCells: CellType[]) {
    const updateCount = ctx.updatePlayers(player => {
      const { type, dir, rot } = ctx.getCell(player.pos)
      if (isAffectedByCells(player) && activeCells.includes(type)) {
        return update(player, {
          pos: p => (dir !== undefined ? movePos(p, dir) : p),
          rot: r => (rot !== undefined ? r + rot : r),
        })
      } else {
        return false
      }
    })

    if (updateCount > 0) {
      await ctx.post()
      await checkHoles()
    }
  }

  async function resolveBoardLasers() {
    ctx.updateState({
      // TODO
    })
  }

  async function resolvePlayerLasers() {
    ctx.updateState({
      // TODO
    })
  }

  async function resolveRepairs() {
    const updateCount = ctx.updatePlayers(player => {
      const { type } = ctx.getCell(player.pos)
      if (isAbleToRepair(player) && type === CellType.REPAIR) {
        return repairPlayer(player, 1)
      } else {
        return false
      }
    })

    if (updateCount > 0) {
      await ctx.post()
    }
  }

  async function resolveCheckpoints() {
    const updateCount = ctx.updatePlayers(player => {
      const checkpoint = ctx.getCheckpointAtPosition(player.pos)
      if (
        checkpoint !== undefined &&
        isAffectedByCheckpoint(player, checkpoint)
      ) {
        return triggerPlayerCheckpoint(player, checkpoint)
      } else {
        return false
      }
    })

    if (updateCount > 0) {
      await ctx.post()
    }
  }

  function movePlayerCheckRecursive(
    playerId: PlayerId,
    dir: Direction,
    pushPlayers = true,
    movedPlayers: PlayerId[] = []
  ): PlayerId[] {
    const oldPos = ctx.getPlayer(playerId).pos
    if (getWall(ctx.getBoard(), oldPos, dir) !== WallType.NONE) {
      return []
    }

    const newPos = movePos(oldPos, dir, 1)
    const collidingPlayerId = ctx.getPlayerOrder().find(otherPlayerId => {
      const otherPos = ctx.getPlayer(otherPlayerId).pos
      return isSamePos(newPos, otherPos)
    })

    if (collidingPlayerId !== undefined) {
      if (pushPlayers) {
        return movePlayerCheckRecursive(collidingPlayerId, dir, pushPlayers, [
          ...movedPlayers,
          playerId,
        ])
      }

      return []
    }

    return [...movedPlayers, playerId]
  }

  async function movePlayer(
    playerId: PlayerId,
    dir: Direction,
    dis: number,
    pushPlayers = true
  ) {
    for (let i = 0; i < dis; i++) {
      if (!isAbleToMove(ctx.getPlayer(playerId))) {
        return
      }

      const movingPlayers = movePlayerCheckRecursive(playerId, dir, pushPlayers)
      ctx.updatePlayers((player, movingPlayerId) => {
        if (movingPlayers.includes(movingPlayerId)) {
          return update(player, {
            pos: pos => movePos(pos, dir, 1),
          })
        } else {
          return false
        }
      })
      await ctx.post()
      await checkHoles()
    }
  }
}
