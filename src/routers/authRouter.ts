import { Router } from "express"
// import { PrismaClient } from "@prisma/client"
import { authSchema } from "@/schemas/authSchema"
import sendResponse from "@/utils/response"

// const prisma = new PrismaClient()

const authRouter = Router()

authRouter.post("/register", async (req, res) => {
  try {
    const { value, error } = authSchema.validate(req.body, {})
    if (error) sendResponse({ res, status: 400, message: error as unknown as string })
    console.log("🚀 || error:", error)
  } catch (error) {
    sendResponse({ res, status: 500 })
  }
})

authRouter.post("/login", () => {})

export default authRouter
