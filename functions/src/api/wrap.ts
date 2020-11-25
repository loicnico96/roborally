import { RequestHandler, Response } from "express"
import { AuthRequest, AuthData } from "./middleware/auth"

export type Handler<T> = (
  auth: AuthData,
  params: unknown,
  body: unknown
) => Promise<T>

export function wrap<T>(handler: Handler<T>): RequestHandler {
  return async (req: AuthRequest, res: Response): Promise<Response> => {
    if (req.auth === undefined) {
      return res.status(401).send("Not authenticated")
    }

    try {
      const response = await handler(req.auth, req.params, req.body)
      return res.status(200).send(response)
    } catch (error) {
      console.error(error)
      return res.status(500).send("Internal error")
    }
  }
}
