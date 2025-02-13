import express from "express"
import cors from "cors"
import authRouter from "./routers/authRouter"
import productRouter from "./routers/productRouter"
import requireAuth from "./middleware/requireAuth"
import dotenv from "dotenv"
import userRouter from "./routers/userRouter"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is up and running!")
})

app.use("/api/auth", authRouter)
app.use("/api/products", requireAuth, productRouter)
app.use("/api/users", requireAuth, userRouter)

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`))
