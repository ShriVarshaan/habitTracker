import express from "express"
import { createHabit, getAllHabits } from "../controllers/habitsController.js"


const router = express.Router()

router.route("/")
    .get(getAllHabits)
    .post(createHabit) //add middleware to check if the user is logged in and also to validate the habit
export default router