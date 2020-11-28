import * as firebase from "firebase-admin"

firebase.initializeApp()

import httpTrigger from "./http/httpTrigger"

export { httpTrigger }
