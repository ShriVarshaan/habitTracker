import { Habit } from "../models/Habit"
import HabitComplete from "../models/HabitComplete"

export const completeHabit = async (req, res, next) => {
    try{
        const date = new Date()
        date.setUTCHours(0,0,0,0)
        const newCompletion = new HabitComplete({habitId: req.params.id, completedOn:date})
        await newCompletion.save()
        return res.status(201).json({message: "Habit completed for today"})
    }catch (err){
        return res.status(400).json({message: "error in completion"})
    }
}

export const deleteCompletion = async (req, res, next) => {
    try{
        const date = new Date()
        date.setUTCHours(0,0,0,0)
        const completion = await HabitComplete.findOne({completedOn: date})
        if (!completion) {
            return res.status(404).json({message: "Complete a habit to delete"})
        }
        await HabitComplete.findOneAndDelete({completedOn: date})
        return res.status(200).json({message: "deleted successfully"})
    } catch (err){
        return res.status(400).json({message: "error"})
    }
}