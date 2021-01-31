import { Collection, GameCollection } from "common/firestore/collections"
import { GameType } from "common/GameSettings"
import { enumValues } from "common/utils/enums"
import { keys } from "common/utils/objects"

import { firestoreAdmin } from "./firestore/admin"
import { BOARDS } from "./roborally/boards"

enumValues(GameType).forEach(game => {
  firestoreAdmin.collection(Collection.GAME).doc(game).set({ game })
})

keys(BOARDS).forEach(boardId => {
  firestoreAdmin
    .collection(Collection.GAME)
    .doc(GameType.ROBORALLY)
    .collection(GameCollection.BOARD)
    .doc(boardId)
    .set(BOARDS[boardId])
})
