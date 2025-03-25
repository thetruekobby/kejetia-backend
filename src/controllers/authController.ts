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
  // #swagger.tags = ['Auth']
  try {
    const error = validate(authSchema, req.body)
    if (error) return sendResponse({ res, status: 400, message: error })
      const { email, password } = req.body
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userExists) return sendResponse({ res, status: 400, message: "User already exists. Please log in" })
      const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    const token = createToken({ id: user.id, email })
    if (!token) throw new Error()
      
      sendResponse({ res, status: 201, data: { token } })
    } catch (error) {
      sendResponse({ res, status: 500 })
    }
  }
  
  export const loginUser: RequestHandler = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Login user'
    // #swagger.description = 'Login user'

   /*   #swagger.parameters['body'] = {
       in: 'body',
       schema: {
         email: 'user@gmail.com',
         password: "1234",
       },
     } */

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
      if (!isPasswordValid) return sendResponse({ res, status: 400, message: "Invalid Credentials" })
      const token = createToken({ id: user.id, email })
      if (!token) throw new Error()
      sendResponse({ res, status: 200, data: { token } })
    } catch (error) {
      sendResponse({ res, status: 500 })
    }
  }
