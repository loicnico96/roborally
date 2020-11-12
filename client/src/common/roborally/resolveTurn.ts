import update, { Spec } from "immutability-helper"
import { mapValues } from "common/utils/objects"
import { RoborallyState, GamePhase } from "./model/RoborallyState"
import {
  PlayerId,
  RoborallyPlayer,
  getInitialPlayerState,
} from "./model/RoborallyPlayer"
import { Card, CardAction, getCardAction, getCardPriority } from "./model/Card"
import { forEachAsync } from "common/utils/forEachAsync"
import { getDir, movePos, Direction, Rotation, getPos } from "./model/Position"
import {
  BoardData,
  CellType,
  getCell,
  getWall,
  WallType,
} from "./model/BoardData"
import { sortBy, SortDirection } from "common/utils/arrays"

type StateChangeHandler = (
  newState: RoborallyState,
  animDuration: number
) => Promise<void>

type PlayerAction = {
  playerId: PlayerId
  card: Card
}

function getOrderedPlayerActions(
  { players }: RoborallyState,
  sequence: number
): PlayerAction[] {
  const playerActions: PlayerAction[] = []
  Object.keys(players).forEach(playerId => {
    const player = players[playerId]
    const card = player.program[sequence]
    if (card !== null && !player.destroyed) {
      playerActions.push({
        playerId,
        card,
      })
    }
  })

  return sortBy(
    playerActions,
    action => getCardPriority(action.card),
    SortDirection.DESC
  )
}

export async function resolveTurn(
  initialState: RoborallyState,
  onStateChanged: StateChangeHandler | null = null
): Promise<RoborallyState> {
  let gameState = initialState
  if (gameState.phase !== GamePhase.PROGRAM) {
    return gameState
  }

  await startResolving()

  for (let sequence = 0; sequence < 5; sequence++) {
    await resolveSequence(sequence)
  }

  await respawnPlayers()
  await startNextTurn()

  return gameState

  async function startResolving() {
    return updateState(
      {
        players: players =>
          mapValues(players, player =>
            update(player, {
              cards: { $set: [] },
            })
          ),
        sequence: { $set: 0 },
      },
      1
    )
  }

  async function respawnPlayers() {
    const destroyedPlayers = gameState.playerOrder.filter(playerId => {
      const player = getPlayer(playerId)
      return player.destroyed
    })

    if (destroyedPlayers.length > 0) {
      await updatePlayers(
        destroyedPlayers,
        player =>
          getInitialPlayerState(
            getPos(0, 0),
            player.checkpointDir,
            player.checkpoint,
            2
          ),
        1
      )
    }
  }

  async function startNextTurn() {
    return updateState(
      {
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
      },
      1
    )
  }

  async function resolveSequence(sequence: number) {
    await updateState(
      {
        sequence: { $set: sequence },
        phase: { $set: GamePhase.RESOLVE_PLAYERS },
        playerCurrent: { $set: null },
      },
      1
    )
    await resolvePlayerActions(sequence)
    await updateState({ phase: { $set: GamePhase.RESOLVE_CONVEYORS_FAST } }, 1)
    await resolveBoardMoves([CellType.CONVEYOR_FAST])
    await updateState({ phase: { $set: GamePhase.RESOLVE_CONVEYORS } }, 1)
    await resolveBoardMoves([CellType.CONVEYOR_FAST, CellType.CONVEYOR])
    await updateState({ phase: { $set: GamePhase.RESOLVE_GEARS } }, 1)
    await resolveBoardMoves([CellType.GEAR])
    await updateState({ phase: { $set: GamePhase.RESOLVE_LASERS } }, 1)
    await resolveBoardLasers()
    await resolvePlayerLasers()
    await updateState({ phase: { $set: GamePhase.RESOLVE_CHECKPOINTS } }, 1)
    await resolveRepairs()
    await resolveCheckpoints()
  }

  async function resolvePlayerActions(sequence: number) {
    const playerActions = getOrderedPlayerActions(gameState, sequence)
    return forEachAsync(playerActions, async ({ playerId, card }) => {
      await updateState({ playerCurrent: { $set: playerId } }, 1)
      await resolvePlayerAction(playerId, getCardAction(card))
    })
  }

  async function resolvePlayerAction(playerId: PlayerId, action: CardAction) {
    switch (action) {
      case CardAction.MOVE_1:
        await movePlayer(playerId, getDir(getPlayer(playerId).rot), 1)
        break
      case CardAction.MOVE_2:
        await movePlayer(playerId, getDir(getPlayer(playerId).rot), 2)
        break
      case CardAction.MOVE_3:
        await movePlayer(playerId, getDir(getPlayer(playerId).rot), 3)
        break
      case CardAction.MOVE_BACK:
        await movePlayer(playerId, getDir(getPlayer(playerId).rot + 2), 1)
        break
      case CardAction.ROTATE_LEFT:
        await updatePlayer(
          playerId,
          {
            rot: rot => rot + Rotation.LEFT,
          },
          1
        )
        break
      case CardAction.ROTATE_RIGHT:
        await updatePlayer(
          playerId,
          {
            rot: rot => rot + Rotation.RIGHT,
          },
          1
        )
        break
      case CardAction.ROTATE_BACK:
        await updatePlayer(
          playerId,
          {
            rot: rot => rot + Rotation.REVERSE,
          },
          1
        )
        break
      default:
    }
  }

  async function checkHoles() {
    const fallingPlayers = gameState.playerOrder.filter(playerId => {
      const player = getPlayer(playerId)
      if (player.destroyed) {
        return false
      }

      const { type } = getCell(getBoard(), player.pos)
      return type === CellType.HOLE
    })

    if (fallingPlayers.length > 0) {
      await updatePlayers(
        fallingPlayers,
        player =>
          update(player, {
            destroyed: { $set: true },
            pos: {
              x: { $set: -1 },
              y: { $set: -1 },
            },
          }),
        1
      )
    }
  }

  async function resolveBoardMoves(activeCells: CellType[]) {
    const movingPlayers = gameState.playerOrder.filter(playerId => {
      const player = getPlayer(playerId)
      const { type } = getCell(getBoard(), player.pos)
      return !player.destroyed && activeCells.includes(type)
    })

    if (movingPlayers.length > 0) {
      await updatePlayers(
        movingPlayers,
        player => {
          const { type, dir, rot } = getCell(getBoard(), player.pos)
          if (activeCells.includes(type)) {
            return update(player, {
              pos: p => (dir !== undefined ? movePos(p, dir) : p),
              rot: r => (rot !== undefined ? r + rot : r),
            })
          }
          return player
        },
        1
      )
      await checkHoles()
    }
  }

  async function resolveBoardLasers() {
    return updateState(
      {
        // TODO
      },
      0 // TOOD
    )
  }

  async function resolvePlayerLasers() {
    return updateState(
      {
        // TODO
      },
      0 // TOOD
    )
  }

  async function resolveRepairs() {
    const repairedPlayers = gameState.playerOrder.filter(playerId => {
      const player = getPlayer(playerId)
      const { type } = getCell(getBoard(), player.pos)
      return !player.destroyed && type === CellType.REPAIR && player.damage > 0
    })

    if (repairedPlayers.length > 0) {
      await updatePlayers(
        repairedPlayers,
        player =>
          update(player, {
            damage: dmg => dmg - 1,
          }),
        1
      )
    }
  }

  async function resolveCheckpoints() {
    return updateState(
      {
        // TODO
      },
      0 // TOOD
    )
  }

  function movePlayerCheckRecursive(
    playerId: PlayerId,
    dir: Direction,
    pushPlayers = true,
    movedPlayers: PlayerId[] = []
  ): PlayerId[] {
    const oldPos = getPlayer(playerId).pos
    if (getWall(getBoard(), oldPos, dir) !== WallType.NONE) {
      return []
    }

    const newPos = movePos(oldPos, dir, 1)
    for (const otherPlayerId in gameState.players) {
      const otherPos = getPlayer(otherPlayerId).pos
      if (otherPos.x === newPos.x && otherPos.y === newPos.y) {
        if (pushPlayers) {
          return movePlayerCheckRecursive(otherPlayerId, dir, pushPlayers, [
            ...movedPlayers,
            playerId,
          ])
        } else {
          return []
        }
      }
    }

    return [...movedPlayers, playerId]
  }

  function getBoard(): BoardData {
    return gameState.board
  }

  function getPlayer(playerId: PlayerId): RoborallyPlayer {
    return gameState.players[playerId]
  }

  async function movePlayer(
    playerId: PlayerId,
    dir: Direction,
    dis: number,
    pushPlayers = true
  ) {
    for (let i = 0; i < dis && !getPlayer(playerId).destroyed!; i++) {
      const movingPlayers = movePlayerCheckRecursive(playerId, dir, pushPlayers)
      await updatePlayers(
        movingPlayers,
        player =>
          update(player, {
            pos: pos => movePos(pos, dir, 1),
          }),
        1
      )
      await checkHoles()
    }
  }

  async function updatePlayer(
    playerId: PlayerId,
    updateSpec: Spec<RoborallyPlayer, never>,
    animDuration: number
  ) {
    return updateState(
      {
        players: {
          [playerId]: updateSpec,
        },
      },
      animDuration
    )
  }

  async function updatePlayers(
    playerIds: PlayerId[],
    updateSpec: Spec<RoborallyPlayer, never>,
    animDuration: number
  ) {
    return updateState(
      {
        players: playerIds.reduce(
          (updates, playerId) =>
            Object.assign(updates, { [playerId]: updateSpec }),
          {} as Record<PlayerId, Spec<RoborallyPlayer, never>>
        ),
      },
      animDuration
    )
  }

  async function updateState(
    updateSpec: Spec<RoborallyState, never>,
    animDuration: number
  ) {
    gameState = update(gameState, updateSpec)
    if (onStateChanged) {
      await onStateChanged(gameState, animDuration)
    }
  }
}
