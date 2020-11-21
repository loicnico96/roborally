import { Collection, DataFetcher } from "common/firestore/collections"
import { BaseSettings } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { BoardId } from "./model/BoardData"
import { Direction } from "./model/Position"
import { getInitialGameState, RoborallyState } from "./model/RoborallyState"

export type RoborallyOptions = {
  boardId: BoardId
}

export const RoborallySettings: BaseSettings<
  RoborallyState,
  RoborallyOptions
> = {
  getDefaultOptions(): RoborallyOptions {
    return {
      boardId: BoardId.ISLAND,
    }
  },

  async getInitialGameState(
    playerIds: PlayerId[],
    options: RoborallyOptions,
    fetchData: DataFetcher
  ): Promise<RoborallyState> {
    const { boardId } = options
    const boardData = await fetchData(Collection.BOARD, boardId)
    return getInitialGameState(
      boardId,
      boardData,
      boardData.checkpoints,
      playerIds,
      boardData.checkpoints[0],
      Direction.NORTH
    )
  },
}
