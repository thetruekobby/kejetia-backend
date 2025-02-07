import Joi from "joi"
import { Prisma, User } from "@prisma/client"

export const authSchema = Joi.object<Prisma.UserCreateInput>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
