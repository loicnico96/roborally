import { Router } from "express"
import { wrap } from "./wrap"

const routes = Router()

routes.get(
  "/hello",
  wrap(async auth => Promise.resolve(`Hello ${auth.userId}`))
)

export default routes
