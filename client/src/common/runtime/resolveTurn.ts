import update, { Spec } from "immutability-helper"
import { mapValues } from "../utils/mapValues"
import { GameState, GamePhase } from "../model/GameState"
import { PlayerId, PlayerState } from "common/model/PlayerState"
import {
  Card,
  CardAction,
  getCardAction,
  getCardPriority,
} from "common/model/Card"
import { forEachAsync } from "../utils/forEachAsync"
import {
  getDir,
  move,
  Direction,
  Rotation,
  reverse,
} from "common/model/Position"
import {
  BoardData,
  CellType,
  getCell,
  getWall,
  WallType,
} from "common/model/BoardData"

type StateChangeHandler = (
  newState: GameState,
  animDuration: number
) => Promise<void>

function sortBy<T>(array: T[], fn: (value: T) => number): T[] {
  const result = [...array]
  result.sort((a, b) => fn(a) - fn(b))
  return result
}

type PlayerAction = {
  playerId: PlayerId
  card: Card
}

function getOrderedPlayerActions(
  { players }: GameState,
  sequence: number
): PlayerAction[] {
  const playerActions: PlayerAction[] = []
  Object.keys(players).forEach(playerId => {
    const card = players[playerId].program[sequence]
    if (card !== null) {
      playerActions.push({
        playerId,
        card,
      })
    }
  })

  return sortBy(playerActions, action => getCardPriority(action.card))
}

export async function resolveTurn(
  initialState: GameState,
  boardData: BoardData,
  onStateChanged: StateChangeHandler | null = null
): Promise<GameState> {
  let gameState = initialState
  if (gameState.phase !== GamePhase.PROGRAM) {
    return gameState
  }

  await startResolving()

  for (let sequence = 0; sequence < 5; sequence++) {
    await resolveSequence(sequence)
  }

  await startNextTurn()

  return gameState

  async function startResolving() {
    return updateState(
      {
        phase: { $set: GamePhase.RESOLVE },
        players: players =>
          mapValues(players, player =>
            update(player, {
              cards: { $set: [] },
            })
          ),
      },
      1
    )
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
    await resolvePlayerActions(sequence)
    await resolveConveyors([CellType.CONVEYOR_FAST, CellType.CONVEYOR])
    await resolveConveyors([CellType.CONVEYOR])
    await resolveGears([CellType.GEAR])
    await resolveBoardLasers()
    await resolvePlayerLasers()
    await resolveRepairs([CellType.REPAIR])
    await resolveCheckpoints()
  }

  async function resolvePlayerActions(sequence: number) {
    const playerActions = getOrderedPlayerActions(gameState, sequence)
    return forEachAsync(playerActions, async ({ playerId, card }) => {
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
        await movePlayer(playerId, reverse(getDir(getPlayer(playerId).rot)), 1)
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

  async function resolveConveyors(activeCells: CellType[]) {
    return updatePlayers(player => {
      const { type, dir, rot } = getCell(boardData, player.pos)
      if (activeCells.includes(type) && dir !== undefined) {
        return update(player, {
          pos: p => move(p, dir),
          rot: r => rot !== undefined ? r + rot : r,
        })
      }
      return player
    }, 1)
  }

  async function resolveGears(activeCells: CellType[]) {
    return updatePlayers(player => {
      const { type, rot } = getCell(boardData, player.pos)
      if (activeCells.includes(type) && rot !== undefined) {
        return update(player, {
          rot: r => r + rot,
        })
      }
      return player
    }, 1)
  }

  async function resolveBoardLasers() {
    return updateState(
      {
        // TODO
      },
      1
    )
  }

  async function resolvePlayerLasers() {
    return updateState(
      {
        // TODO
      },
      1
    )
  }

  async function resolveRepairs(activeCells: CellType[]) {
    return updatePlayers(player => {
      const { type } = getCell(boardData, player.pos)
      if (activeCells.includes(type) && player.damage > 1) {
        return update(player, {
          damage: dmg => dmg - 1,
        })
      }
      return player
    }, 1)
  }

  async function resolveCheckpoints() {
    return updateState(
      {
        // TODO
      },
      1
    )
  }

  function movePlayerCheckRecursive(
    playerId: PlayerId,
    dir: Direction,
    pushPlayers = true,
    movedPlayers: PlayerId[] = []
  ): PlayerId[] {
    const oldPos = getPlayer(playerId).pos
    if (getWall(boardData, oldPos, dir) !== WallType.NONE) {
      return []
    }

    const newPos = move(oldPos, dir, 1)
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

  function getPlayer(playerId: PlayerId): PlayerState {
    return gameState.players[playerId]
  }

  async function movePlayer(
    playerId: PlayerId,
    dir: Direction,
    dis: number,
    pushPlayers = true
  ) {
    for (let i = 0; i < dis; i++) {
      const movedPlayers = movePlayerCheckRecursive(playerId, dir, pushPlayers)
      await updatePlayers((player, id) => {
        if (movedPlayers.includes(id)) {
          return update(player, {
            pos: pos => move(pos, dir, 1),
          })
        }

        return player
      }, 1)
    }
  }

  async function updatePlayer(
    playerId: PlayerId,
    updateSpec: Spec<PlayerState, never>,
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
    updateFn: (player: PlayerState, playerId: PlayerId) => PlayerState,
    animDuration: number
  ) {
    return updateState(
      {
        players: players => mapValues(players, updateFn),
      },
      animDuration
    )
  }

  async function updateState(
    updateSpec: Spec<GameState, never>,
    animDuration: number
  ) {
    gameState = update(gameState, updateSpec)
    if (onStateChanged) {
      await onStateChanged(gameState, animDuration)
    }
  }
}
