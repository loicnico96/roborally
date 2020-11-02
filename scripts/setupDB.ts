import { Collection } from "../client/src/common/firestore/collections"
import { firestoreAdmin } from "./firestore/admin"
import { ROOMS, GAMES, BOARDS } from "./testData"

for (const boardId in BOARDS) {
  firestoreAdmin.collection(Collection.BOARD).doc(boardId).set(BOARDS[boardId])
}

for (const gameId in GAMES) {
  firestoreAdmin.collection(Collection.GAME).doc(gameId).set(GAMES[gameId])
}

for (const roomId in ROOMS) {
  firestoreAdmin.collection(Collection.ROOM).doc(roomId).set(ROOMS[roomId])
}
