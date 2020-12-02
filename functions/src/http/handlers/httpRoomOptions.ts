import { Collection } from "common/firestore/collections"
import { HttpTrigger } from "common/functions"
import { getGameSettings, GameOptions } from "common/GameSettings"
import { RoomStatus } from "common/model/RoomData"
import {
  required,
  validateString,
  validateUnknown,
  validateRecord,
  validateObject,
} from "common/utils/validation"

import { getCollection } from "../../utils/collections"
import {
  preconditionError,
  permissionError,
  validationError,
} from "../../utils/errors"
import { firestore } from "../../utils/firestore"

import { handleTrigger } from "./handleTrigger"

const validationSchema = {
  options: required(validateRecord(validateUnknown())),
  roomId: required(validateString()),
}

export default handleTrigger<HttpTrigger.ROOM_OPTIONS>(
  validationSchema,
  async (data, userId) => {
    const success = await firestore.runTransaction(async transaction => {
      const roomRef = getCollection(Collection.ROOM).doc(data.roomId)
      const roomDoc = await transaction.get(roomRef)
      const roomData = roomDoc.data()
      if (roomData === undefined) {
        throw preconditionError("Invalid room ID")
      }

      if (roomData.status !== RoomStatus.OPENED) {
        throw preconditionError("Inconsistent status")
      }

      if (roomData.ownerId !== userId) {
        throw permissionError("Not allowed")
      }

      const { optionsValidator } = getGameSettings(roomData.game)
      let newOptions: GameOptions

      try {
        newOptions = {
          ...roomData.options,
          ...validateObject(optionsValidator)(data.options),
        }
      } catch (error) {
        throw validationError(error.message)
      }

      transaction.update(roomRef, { options: newOptions })

      return true
    })

    return { success }
  }
)