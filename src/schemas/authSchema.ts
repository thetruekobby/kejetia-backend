import Joi from "joi"
import { Prisma } from "@prisma/client"

export const authSchema = Joi.object<Prisma.UserCreateInput>({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email",
  }),
  password: Joi.string()
    .required()
    .min(6)
    .pattern(new RegExp("[a-z]"))
    .message("Password must contain at least one lowercase letter")
    .pattern(new RegExp("[A-Z]"))
    .message("Password must contain at least one uppercase letter")
    .pattern(new RegExp("[0-9]"))
    .message("Password must contain at least one number")
    .pattern(new RegExp("[~`!@#$%^&*()_+|/;:'\"<>?]"))
    .message("Password must contain at least one special character"),
})
