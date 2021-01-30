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

  async getInitialGameState({ options, playerOrder, players }, fetchData) {
    const { boardIds, checkpoints: numCheckpoints } = options

    async function fetchBoardData(boardId: BoardId): Promise<BoardData> {
      return fetchData(Collection.BOARD, boardId)
    }

    const boardDatas = await Promise.all(boardIds.map(fetchBoardData))
    const mergedBoardData = mergeBoards(boardDatas)
    const checkpoints = shuffle(mergedBoardData.checkpoints)

    return getInitialGameState(
      boardIds,
      mergedBoardData,
      checkpoints.slice(0, numCheckpoints + 1),
      playerOrder,
      players
    )
  },

  async resolvePlayerAction(gameState, playerId, action) {
    const ctx = new RoborallyContext(gameState)
    await ctx.resolve(resolvePlayerAction, playerId, action)
    return ctx.getState()
  },

  async resolveState(gameState, onStateChanged) {
    const ctx = new RoborallyContext(gameState, onStateChanged)
    await ctx.resolve(resolveState)
    return ctx.getState()
  },

  validateAction,
  validateOptions,
}
