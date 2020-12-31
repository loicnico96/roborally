import { Collection } from "common/firestore/collections"
import { HttpTrigger } from "common/functions"
import { getGameSettings, GameType } from "common/GameSettings"
import { RoomStatus } from "common/model/RoomData"
import { validateAny, validateString } from "common/utils/validation"

import { getCollection } from "../../utils/collections"
import { preconditionError } from "../../utils/errors"
import { firestore } from "../../utils/firestore"

import { handleTrigger } from "./handleTrigger"

const validationSchema = {
  roomId: validateString(),
  action: validateAny(),
}

export default handleTrigger<HttpTrigger.GAME_ACTION>(
  validationSchema,
  async (data, playerId) => {
    const success = await firestore.runTransaction(async transaction => {
      const clientRef = getCollection(Collection.CLIENT).doc(data.roomId)
      const serverRef = getCollection(Collection.SERVER).doc(data.roomId)
      const serverDoc = await transaction.get(serverRef)
      const gameState = serverDoc.data()
      if (gameState === undefined) {
        throw preconditionError("Invalid game ID")
      }

      const player = gameState.players[playerId]
      if (player === undefined) {
        throw preconditionError("Not a player")
      }

      if (player.ready) {
        return false
      }

      // TODO Determine this from call/document
      const gameType = GameType.ROBORALLY

      const {
        getContext,
        resolvePlayerAction,
        resolveState,
        validateAction,
      } = getGameSettings(gameType)

      const action = validateAction(gameState, playerId, data.action)

      const ctx = getContext(gameState)

      const nextState = await ctx.resolve(resolvePlayerAction, playerId, action)

      transaction.set(clientRef, nextState)

      const resolvedState = await ctx.resolve(resolveState)

      transaction.set(serverRef, resolvedState)

      if (ctx.isFinished()) {
        const roomRef = getCollection(Collection.ROOM).doc(data.roomId)
        transaction.update(roomRef, { status: RoomStatus.FINISHED })
      }

      return true
    })

    return { success }
  }
)
