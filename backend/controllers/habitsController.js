import {Habit} from "../models/Habit.js"

export const getAllHabits = async (req, res, next) => {
    try {
        if (req.user){
            const habits = await Habit.find({userId: req.user._id})
            return res.status(200).json(habits)
        }
        return res.status(200).json({message: "Not logged in"})
    } catch (err){
        return next(err)
    }
}

export const createHabit = async (req, res, next) => {
    try{
        const habit = new Habit({...req.body, userId: req.user._id})
        await habit.save()
        res.status(201).json({message: "Habit created successfully"})
    }catch (err){
        return next(err)
    }
}