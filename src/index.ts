import express from "express"
import cors from "cors"
import authRouter from "./routers/authRouter"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is up and running!")
})

app.use("/api/auth", authRouter)

app.listen(process.env.PORT ||5000, () => console.log(`Server running on port ${process.env.PORT}`))
