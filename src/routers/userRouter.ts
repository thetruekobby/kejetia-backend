import { Router } from "express"
import { addProductToWishlist, getWishlist } from "../controllers/userController"

const userRouter = Router()

userRouter.post("/wishlist", addProductToWishlist)
userRouter.get("/wishlist", getWishlist)

export default userRouter
