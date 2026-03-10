import express from "express"
import { createHabit, getAllHabits, getHabitById } from "../controllers/habitsController.js"
import passport from '../config/passport.js'
import { validateHabit } from "../middleware/habit.js"
import { completeHabit, deleteCompletion } from "../controllers/habitCompletionController.js"


const router = express.Router()

router.route("/")
    .get(passport.authenticate("jwt", {session: false}), getAllHabits)
    .post(passport.authenticate("jwt", {session: false}), validateHabit, createHabit) //add middleware to check if the user is logged in and also to validate the habit

router.route("/:id")
    .get(passport.authenticate("jwt", {session: false}), getHabitById)
    .patch(passport.authenticate("jwt", {session: false}))

router.route("/:id/complete")
    .post(passport.authenticate("jwt", {session: false}), completeHabit)
    .delete(passport.authenticate("jwt", {session: false}), deleteCompletion)

router.route("/:id/completions")
    .get(passport.authenticate("jwt", {session: false}))

export default router