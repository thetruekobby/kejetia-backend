import { Router } from "express"
import { get } from "http"
import { addProduct, getProductById, getProducts } from "../controllers/productContoller"

const productRouter = Router()

productRouter.get("", getProducts)
productRouter.post("", addProduct)
productRouter.get("/:id", getProductById)

export default productRouter
