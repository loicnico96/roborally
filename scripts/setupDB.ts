import firebase from '../client/src/firebase'
import { ROOMS, GAMES, BOARDS } from './testData'

const firestore = firebase.firestore()

for (const room_id in ROOMS) {
  firestore.collection('room').doc(room_id).set(ROOMS[room_id])
}

for (const game_id in GAMES) {
  firestore.collection('game').doc(game_id).set(GAMES[game_id])
}

for (const board_id in BOARDS) {
  firestore.collection('board').doc(board_id).set(BOARDS[board_id])
}
