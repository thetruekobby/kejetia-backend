import express from "express"
import cors from "cors"
import authRouter from "./routers/authRouter"
import productRouter from "./routers/productRouter"
import requireAuth from "./middleware/requireAuth"
import dotenv from "dotenv"
import userRouter from "./routers/userRouter"
import sendResponse from "./utils/response"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "./swagger-output.json"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is up and running!")
})

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/auth", authRouter)
app.use("/api/products", requireAuth, productRouter)
app.use("/api/user", requireAuth, userRouter)

// app.use((err, req, res, next) => {
//   sendResponse({ res, status: 500, message: "There was an error processing your request" })
// })

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
