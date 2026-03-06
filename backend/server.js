import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

const app = express()

app.use(cookieParser())
app.use(express.json())

dotenv.config()

app.get("/", (req, res) => {
    res.json({"message": "It works"})
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})