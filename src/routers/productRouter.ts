import { Router } from "express"
import { get } from "http"
import { addProduct, getProductById, getProducts } from "../controllers/productContoller"
import { uploadMany } from "../middleware/multer"

const productRouter = Router()

productRouter.get("", getProducts)
productRouter.post("", uploadMany, addProduct)
productRouter.get("/:id", getProductById)

export default productRouter
