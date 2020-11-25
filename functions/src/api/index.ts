import createApp from "express"
import authMiddleware from "./middleware/auth"
import corsMiddleware from "./middleware/cors"
import routes from "./routes"
import { functions } from "utils/functions"

const app = createApp()

app.use(corsMiddleware)
app.use(authMiddleware)
app.use("/", routes)

const api = functions.https.onRequest(app)

export default api
