import {Habit} from "../models/Habit.js"

export const getAllHabits = async (req, res, next) => {
    try {
        const habits = await Habit.find({userId: req.user._id})
        return res.status(200).json(habits)
    } catch (err){
        return next(err)
    }
}

export const createHabit = async (req, res, next) => {
    try{
        const habit = new Habit({...req.body, userId: req.user._id})
        await habit.save()
        return res.status(201).json({message: "Habit created successfully"})
    }catch (err){
        return next(err)
    }
}

export const getHabitById = async (req, res, next) => {
    const habit = await Habit.findById(req.params.id)
    if (!habit){
        return res.status(404).json({message: "Habit not found"})
    }

    if (habit.userId !== req.user._id){
        console.log(habit.userId)
        console.log(req.user._id)
        return res.status(401).json({message: "Unauthorised"})
    }

    res.status(200).json(habit)
}