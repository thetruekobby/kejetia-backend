import Joi from "joi"

export const wishlistSchema = Joi.object({
  productId: Joi.number().required().strict(),
})

export const cartSchema = wishlistSchema
