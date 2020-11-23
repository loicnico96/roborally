import { getCollection } from "../utils/collections"
import { firestore } from "../utils/firestore"
import { httpsCallable } from "../utils/httpsCallable"
import { Collection } from "common/firestore/collections"
import { required, validateEnum } from "common/utils/validation"
import { HttpTrigger } from "common/functions"
import { getInitialRoomData } from "common/model/RoomData"
import { GameType } from "common/GameSettings"

const validationSchema = {
  game: required(validateEnum(GameType)),
}

export const httpRoomCreate = httpsCallable(
  HttpTrigger.ROOM_CREATE,
  validationSchema,
  async (data, userId, userInfo) => {
    const roomId = await firestore.runTransaction(async transaction => {
      const roomRef = getCollection(Collection.ROOM).doc()
      const roomData = getInitialRoomData(data.game, userId, userInfo)
      transaction.create(roomRef, roomData)
      return roomRef.id
    })

    return { roomId }
  }
)
