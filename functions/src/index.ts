import { initializeApp } from "firebase-admin"
import { HttpTrigger } from "./common/functions"
import { httpReady } from "./http/httpReady"

initializeApp()

const functions = {
  [HttpTrigger.READY]: httpReady,
}

export default functions
