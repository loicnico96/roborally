import { Collection } from "../client/src/common/firestore/collections"
import { firestoreAdmin } from "./firestore/admin"
import { BOARDS } from "./roborally/boards"
import { ROOMS, GAMES } from "./roborally/testData"

for (const [boardId, boardData] of Object.entries(BOARDS)) {
  firestoreAdmin.collection(Collection.BOARD).doc(boardId).set(boardData)
}

for (const [gameId, gameData] of Object.entries(GAMES)) {
  firestoreAdmin.collection(Collection.CLIENT).doc(gameId).set(gameData)
  firestoreAdmin.collection(Collection.SERVER).doc(gameId).set(gameData)
}

for (const [roomId, roomData] of Object.entries(ROOMS)) {
  firestoreAdmin.collection(Collection.ROOM).doc(roomId).set(roomData)
}
