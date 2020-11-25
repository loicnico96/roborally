import cors from "cors"

const ORIGIN = "*"

const corsMiddleware = cors({ origin: ORIGIN })

export default corsMiddleware
