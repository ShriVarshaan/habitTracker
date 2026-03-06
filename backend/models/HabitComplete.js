import mongoose from "mongoose"

const habitCompleteSchema = new mongoose.Schema({
    habitId: {
        type: mongoose.Schema.ObjectId,
        ref: "Habit",
        required: true
    },
    completedOn: {
        type: Date,
        default: Date.now
    }
})

const HabitComplete = mongoose.model("HabitComplete", habitCompleteSchema)

export default HabitComplete