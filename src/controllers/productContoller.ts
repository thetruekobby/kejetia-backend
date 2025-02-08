import { RequestHandler } from "express"
import sendResponse from "../utils/response"
import { PrismaClient } from "@prisma/client"
import { validate } from "../utils/joi"
import { addProductSchema } from "../schemas/productSchema"
import { RequestWithUser } from "../middleware/requireAuth"

const prisma = new PrismaClient()

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        stockLevel: { gte: 1 },
      },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
      },
    })
    sendResponse({ res, data: products })
  } catch (_) {
    sendResponse({ res, status: 500 })
  }
}

export const addProduct: RequestHandler = async (req: RequestWithUser, res) => {
  try {
    const error = validate(addProductSchema, req.body)
    if (error) return sendResponse({ res, status: 400, message: error })
    await prisma.product.create({
      data: { ...req.body, sellerId: req.user.id },
    })
    sendResponse({ res, status: 201 })
  } catch (_) {
    sendResponse({ res, status: 500 })
  }
}
export const getProductById: RequestHandler = async (req: RequestWithUser, res) => {
  try {
    const id = +req.params.id
    const product = await prisma.product.findUnique({
      where: { id },
    })
    if (!product) return sendResponse({ res, status: 404, message: "Product not found" })
    sendResponse({ res, data: product })
  } catch (_) {
    sendResponse({ res, status: 500 })
  }
}
