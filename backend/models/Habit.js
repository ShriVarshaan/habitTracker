import mongoose from "mongoose"
import Joi from "joi"

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, {timestamps: true})

const habitSchemaJoi = Joi.object({
    title: Joi.string().min(3).max(20).required()
})

const Habit = mongoose.model("Habit", habitSchema)

export {Habit, habitSchemaJoi}