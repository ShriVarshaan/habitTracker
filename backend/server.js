import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import {connectDb} from "./config/db.js"

import {User} from "./models/User.js"

import habitRouter from "./routes/habitsRoutes.js"
import authRouter from "./routes/authRoutes.js"

const app = express()
connectDb()

app.use(cookieParser())
app.use(express.json())

//manually adding in a user for testing purposes
app.use(async (req, res, next) => {
    const user = await User.findOne({email: "varshaanvijay@gmail.com"})
    req.user = {_id: user._id}
    next()
})

app.use("/api/habits", habitRouter)
app.use("/api/auth", authRouter)

dotenv.config()

app.get("/", (req, res) => {
    res.json({"message": "It works"})
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({message: err.message || "Internal server error"})
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})