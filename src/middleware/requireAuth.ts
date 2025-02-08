import { RequestHandler, Request } from "express"
import sendResponse from "../utils/response"
import { verifyToken } from "../utils/jwt"

export interface RequestWithUser extends Request {
  user?: any
}
const requireAuth: RequestHandler = async (req: RequestWithUser, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error()
    const token = authorization?.split(" ")[1]
    const decodedPayload = verifyToken(token)
    if (!decodedPayload) throw new Error()
    req.user = { email: decodedPayload.email, id: decodedPayload.id }
    next()
  } catch (error) {
    sendResponse({ res, status: 401 })
  }
}

export default requireAuth
