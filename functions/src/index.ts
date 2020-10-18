import firestore from "./firestore"
import functions from "./functions"

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    try {
      await firestore.collection("items").add({ hello: "world" })
      response.send("Hello from Firebase!")
    } catch {
      response.status(500).end()
    }
  }
)
