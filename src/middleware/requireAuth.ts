import { RequestHandler } from "express"
import sendResponse from "../utils/response"
import { verifyToken } from "../utils/jwt"


const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error()    
    const token = authorization?.split(" ")[1]
    verifyToken(token)
    next()
  } catch (error) {
    sendResponse({ res, status: 401 })
  }
}

export default requireAuth
