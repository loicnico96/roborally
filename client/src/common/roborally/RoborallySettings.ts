import { Collection } from "common/firestore/collections"
import { GameSettings } from "common/GameSettings"
import { shuffle } from "common/utils/arrays"

import { BoardData, BoardId, mergeBoards } from "./model/BoardData"
import { RoborallyContext } from "./model/RoborallyContext"
import { getInitialGameState } from "./model/RoborallyState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const RoborallySettings: GameSettings<"roborally"> = {
  defaultOptions: {
    checkpoints: 3,
    boardIds: [BoardId.ISLAND],
  },

  minPlayers: 1,
  maxPlayers: 4,

  async getInitialGameState(playerIds, options, fetchData) {
    const { boardIds } = options

    async function fetchBoardData(boardId: BoardId): Promise<BoardData> {
      return fetchData(Collection.BOARD, boardId)
    }

    const numCheckpoints = options.checkpoints + 1
    const boardDatas = await Promise.all(boardIds.map(fetchBoardData))
    const boardData = mergeBoards(boardDatas)
    const checkpoints = shuffle(boardData.checkpoints).slice(0, numCheckpoints)
    return getInitialGameState(boardIds, boardData, checkpoints, playerIds)
  },

  async resolvePlayerAction(gameState, playerId, action) {
    const ctx = new RoborallyContext(gameState)
    ctx.resolve(resolvePlayerAction, playerId, action)
    return ctx.getState()
  },

  async resolveState(gameState, onStateChanged) {
    const ctx = new RoborallyContext(gameState, onStateChanged)
    ctx.resolve(resolveState)
    return ctx.getState()
  },

  validateAction,
  validateOptions,
}
