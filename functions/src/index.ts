import * as firebase from "firebase-admin"

firebase.initializeApp()

import { httpReady } from "./http/httpReady"
import { httpRoomCreate } from "./http/httpRoomCreate"
import { httpRoomEnter } from "./http/httpRoomEnter"
import { httpRoomLeave } from "./http/httpRoomLeave"
import { httpRoomStart } from "./http/httpRoomStart"

import api from "./api"

export {
  api,
  httpReady,
  httpRoomCreate,
  httpRoomEnter,
  httpRoomLeave,
  httpRoomStart,
}
