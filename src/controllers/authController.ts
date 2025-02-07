import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { validate } from "../utils/joi"
import { authSchema } from "../schemas/authSchema"
import sendResponse from "../utils/response"
import { comparePassword, hashPassword } from "../utils/bcrypt"
import { PrismaClient } from "@prisma/client"
import { createToken } from "../utils/jwt"

const prisma = new PrismaClient()

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const error = validate(authSchema, req.body)
    if (error) return sendResponse({ res, status: 400, message: error })
    const { email, password } = req.body
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    // })
    // if(user) return sendResponse({ res, status: 400, message: "User already exists. Please log in" })
    const hashedPassword = await hashPassword(password)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    const token = createToken({ email })
    if (!token) throw new Error()

    sendResponse({ res, status: 201, data: { token } })
  } catch (error) {
    sendResponse({ res, status: 500 })
  }
}

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const error = validate(authSchema, req.body)
    const { email, password } = req.body
    if (error) return sendResponse({ res, status: 400, message: error })
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) return sendResponse({ res, status: 400, message: "Invalid Credentials" })

    const isPasswordValid = await comparePassword(password, user.password)
    console.log("🚀 || isPasswordValid:", isPasswordValid)
    if (!isPasswordValid) return sendResponse({ res, status: 400, message: "Invalid Credentials" })
    const token = createToken({ email })
    if (!token) throw new Error()
    sendResponse({ res, status: 200, data: { token } })
  } catch (error) {
    sendResponse({ res, status: 500 })
  }
}
