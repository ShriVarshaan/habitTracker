import express from "express"
import { createHabit, getAllHabits } from "../controllers/habitsController.js"
import { loggedIn } from "../middleware/auth.js"
import { validateHabit } from "../middleware/habit.js"


const router = express.Router()

router.route("/")
    .get(getAllHabits)
    .post(loggedIn, validateHabit, createHabit) //add middleware to check if the user is logged in and also to validate the habit
export default router