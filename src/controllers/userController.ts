import { PrismaClient } from "@prisma/client"
import { RequestHandler } from "express"
import { RequestWithUser } from "../middleware/requireAuth"
import sendResponse from "../utils/response"
import { validate } from "../utils/joi"
import { wishlistSchema } from "../schemas/userSchema"

const prisma = new PrismaClient()
export const addProductToWishlist: RequestHandler = async (req: RequestWithUser, res) => {
  try {
    const userId = req.user.id
    const err = validate(wishlistSchema, req.body)
    if (err) return sendResponse({ res, status: 400, message: err })
    const { productId } = req.body
    const wishlistExists = await prisma.wishlist.findUnique({
      where: { userId },
    })
    if (wishlistExists) {
      await prisma.wishlist.update({
        where: { userId },
        data: {
          product: {
            connect: {
              id: +productId,
            },
          },
        },
      })
    } else {
      await prisma.wishlist.create({
        data: {
          userId,
          product: {
            connect: {
              id: +productId,
            },
          },
        },
      })
    }
    sendResponse({ res, status: 201, message: "Wishlist added successfully" })
  } catch (error) {
    sendResponse({ res, status: 500 })
  }
}

export const getWishlist: RequestHandler = async (req: RequestWithUser, res) => {
  try {
    const userId = req.user.id
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
      select: {
        product: true,
      },
    })
    sendResponse({ res, data: wishlist.product })
  } catch (error) {
    sendResponse({ res, status: 500 })
  }
}
