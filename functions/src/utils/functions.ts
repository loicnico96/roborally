import { region } from "firebase-functions"

const DEPLOYMENT_REGION = "europe-west3"
const FUNCTION_TIMEOUT_SECONDS = 60
const FUNCTION_MEMORY = "128MB"

export const functions = region(DEPLOYMENT_REGION).runWith({
  timeoutSeconds: FUNCTION_TIMEOUT_SECONDS,
  memory: FUNCTION_MEMORY,
})
