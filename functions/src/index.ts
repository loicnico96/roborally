import * as firebase from "firebase-admin"

firebase.initializeApp()

import { httpReady } from "./http/httpReady"
import { httpRoomCreate } from "./http/httpRoomCreate"
import { httpRoomStart } from "./http/httpRoomStart"

export { httpReady, httpRoomCreate, httpRoomStart }
