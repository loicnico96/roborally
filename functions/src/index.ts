import * as firebase from "firebase-admin"

firebase.initializeApp()

import { httpReady } from "./http/httpReady"
import { httpRoomCreate } from "./http/httpRoomCreate"

export { httpReady, httpRoomCreate }
