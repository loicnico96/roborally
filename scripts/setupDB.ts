import { Collection } from "../client/src/common/firestore/collections"
import { firestoreAdmin } from "./firestore/admin"
import { BOARDS } from "./roborally/boards"

for (const [boardId, boardData] of Object.entries(BOARDS)) {
  firestoreAdmin.collection(Collection.BOARD).doc(boardId).set(boardData)
}
