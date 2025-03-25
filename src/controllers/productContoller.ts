import { RequestHandler } from "express"
import sendResponse from "../utils/response"
import { PrismaClient } from "@prisma/client"
import { validate } from "../utils/joi"
import { addProductSchema } from "../schemas/productSchema"
import { RequestWithUser } from "../middleware/requireAuth"
import { send } from "process"
import { s3 } from "../utils/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"

const prisma = new PrismaClient()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
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
        image: {
          select: {
            imageUrl: true,
          },
          take: 1,
        },
      },
    })
    sendResponse({ res, data: products })
  } catch (_) {
    sendResponse({ res, status: 500 })
  }
}
export const addProduct: RequestHandler = async (req: RequestWithUser, res) => {
  try {
    if (!req.files) return sendResponse({ res, status: 400, message: "No images of the product uploaded" })
    const error = validate(addProductSchema, req.body)
    if (error) return sendResponse({ res, status: 400, message: error })
    const product = await prisma.product.create({
      data: { ...req.body, sellerId: req.user.id, price: +req.body.price, stockLevel: +req.body.stockLevel },
    })
    if (!product) throw new Error("Failed to create product")
    await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        const command = new PutObjectCommand({
          Bucket: bucketName,
          Body: file.buffer,
          Key: file.originalname,
        })
        await s3.send(command)
        return prisma.image.create({
          data: {
            productId: product.id,
            imageName: file.originalname,
            imageUrl: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${file.originalname}`,
          },
        })
        
      })
    )
    sendResponse({ res, status: 201 })
  } catch (err) {
    sendResponse({ res, status: 500, message: err.message })
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
