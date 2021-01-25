import { Collection } from "common/firestore/collections"
import { HttpTrigger } from "common/functions"
import { getGameSettings } from "common/GameSettings"
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

      const {
        resolvePlayerAction,
        resolveState,
        validateAction,
      } = getGameSettings("roborally")

      const action = validateAction(gameState, playerId, data.action)

      const nextState = await resolvePlayerAction(gameState, playerId, action)

      transaction.set(clientRef, nextState)

      const resolvedState = await resolveState(nextState)

      transaction.set(serverRef, resolvedState)

      if (resolvedState.winners) {
        const roomRef = getCollection(Collection.ROOM).doc(data.roomId)
        transaction.update(roomRef, { status: RoomStatus.FINISHED })
      }

      return true
    })

    return { success }
  }
)
