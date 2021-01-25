import { Collection, DataFetcher } from "common/firestore/collections"
import { StateChangeHandler } from "common/GameContext"
import { GameSettings, GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { shuffle } from "common/utils/arrays"

import { BoardData, BoardId, mergeBoards } from "./model/BoardData"
import { RoborallyAction } from "./model/RoborallyAction"
import { RoborallyEvent } from "./model/RoborallyEvent"
import { RoborallyOptions } from "./model/RoborallyOptions"
import { getInitialGameState, RoborallyState } from "./model/RoborallyState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { RoborallyContext } from "./RoborallyContext"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const RoborallySettings: GameSettings<GameType.ROBORALLY> = {
  type: GameType.ROBORALLY,
  defaultOptions: {
    checkpoints: 3,
    boardIds: [BoardId.ISLAND],
  },

  maxPlayers: 4,
  minPlayers: 1,

  async getInitialGameState(
    playerIds: PlayerId[],
    options: RoborallyOptions,
    fetchData: DataFetcher
  ): Promise<RoborallyState> {
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

  async resolvePlayerAction(
    gameState: RoborallyState,
    playerId: PlayerId,
    action: RoborallyAction
  ): Promise<RoborallyState> {
    const ctx = new RoborallyContext(gameState)
    ctx.resolve(resolvePlayerAction, playerId, action)
    return ctx.getState()
  },

  async resolveState(
    gameState: RoborallyState,
    onStateChanged?: StateChangeHandler<RoborallyState, RoborallyEvent>
  ): Promise<RoborallyState> {
    const ctx = new RoborallyContext(gameState, onStateChanged)
    ctx.resolve(resolveState)
    return ctx.getState()
  },

  validateAction,
  validateOptions,
}
