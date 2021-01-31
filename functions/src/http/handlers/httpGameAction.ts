import { HttpTrigger } from "common/functions"
import { getGameSettings, GameType } from "common/GameSettings"
import { RoomStatus } from "common/model/RoomData"
import {
  validateAny,
  validateString,
  validateEnum,
} from "common/utils/validation"

import { getClientRef, getServerRef, getRoomRef } from "../../utils/collections"
import { preconditionError } from "../../utils/errors"
import { firestore } from "../../utils/firestore"

import { handleTrigger } from "./handleTrigger"

const validationSchema = {
  game: validateEnum(GameType),
  roomId: validateString(),
  action: validateAny(),
}

export default handleTrigger<HttpTrigger.GAME_ACTION>(
  validationSchema,
  async (data, playerId) => {
    const success = await firestore.runTransaction(async transaction => {
      const clientRef = getClientRef(data.game, data.roomId)
      const serverRef = getServerRef(data.game, data.roomId)
      const serverDoc = await transaction.get(serverRef)
      const gameData = serverDoc.data()
      if (gameData === undefined) {
        throw preconditionError("Invalid game ID")
      }

      const { game, state } = gameData

      const player = state.players[playerId]
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
      } = getGameSettings(game)

      const action = validateAction(state, playerId, data.action)

      const nextState = await resolvePlayerAction(state, playerId, action)

      transaction.set(clientRef, {
        state: nextState,
        game,
      })

      const resolvedState = await resolveState(nextState)

      transaction.set(serverRef, {
        state: resolvedState,
        game,
      })

      if (resolvedState.winners) {
        const roomRef = getRoomRef(data.roomId)
        transaction.update(roomRef, { status: RoomStatus.FINISHED })
      }

      return true
    })

    return { success }
  }
)
