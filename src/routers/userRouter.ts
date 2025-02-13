import { Router } from "express"
import { addProductToWishlist, addToCart, getWishlist, viewCart } from "../controllers/userController"

const userRouter = Router()

userRouter.post("/wishlist", addProductToWishlist)
userRouter.get("/wishlist", getWishlist)

userRouter.post("/cart", addToCart)
userRouter.get("/cart", viewCart)

export default userRouter
