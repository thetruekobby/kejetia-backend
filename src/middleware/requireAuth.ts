import { RequestHandler } from "express"


const requireAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({ code: 1, message: "Authorization token required" })
  }

  const token = authorization?.split(" ")[1]

  try {


    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ code: 1, message: "Authorization not verified" })
  }
}

export default requireAuth
