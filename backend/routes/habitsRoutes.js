import express from "express"
import { createHabit, getAllHabits, getHabitById } from "../controllers/habitsController.js"
import passport from '../config/passport.js'
import { validateHabit } from "../middleware/habit.js"


const router = express.Router()

router.route("/")
    .get(passport.authenticate("jwt", {session: false}), getAllHabits)
    .post(passport.authenticate("jwt", {session: false}), validateHabit, createHabit) //add middleware to check if the user is logged in and also to validate the habit

router.route("/:id")
    .get(passport.authenticate("jwt", {session: false}), getHabitById)

export default router