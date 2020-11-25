import { NextFunction, Request, Response } from "express"
import Auth from "utils/auth"
import { UserId } from "common/model/UserInfo"

export type AuthData = {
  userId: UserId
}

export type AuthRequest = Request & {
  auth?: AuthData
}

async function authenticate(req: Request): Promise<UserId | null> {
  const authHeader = req.headers.authorization

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (authHeader !== undefined && authHeader.startsWith("Bearer ")) {
    // eslint-disable-next-line prefer-destructuring
    const idToken = authHeader.split("Bearer ")[1]

    try {
      const decodedToken = await Auth.verifyIdToken(idToken)
      return decodedToken.uid
    } catch (error) {
      console.log(error)
    }
  }

  return null
}

async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = await authenticate(req)
  if (userId !== null) {
    // eslint-disable-next-line require-atomic-updates
    req.auth = { userId }
  }

  return next()
}

export default authMiddleware
