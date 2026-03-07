import { habitSchemaJoi } from "../models/Habit.js"

export const validateHabit = async (req, res, next) => {
    const {error} = habitSchemaJoi.validate(req.body, {abortEarly: false})

    if (error){
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({error: errorMessages})
    }
    next()
}