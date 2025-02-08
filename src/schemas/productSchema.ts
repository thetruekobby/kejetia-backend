import {  Product } from "@prisma/client"
import Joi from "joi"

export const addProductSchema = Joi.object<Product>({
  name: Joi.string().required(),
  price: Joi.number().required().strict(),
  imageUrl: Joi.string(),
  description: Joi.string().required(),
  stockLevel: Joi.number().required().strict(),
})

