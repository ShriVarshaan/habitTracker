import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected")
    } catch (err){
        console.error("Error connecting", err)
        process.exit(1)
    }
}