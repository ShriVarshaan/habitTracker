import express from "express"
import {login, signup} from "../controllers/authController.js"
import { validateUser } from "../middleware/user.js"

const router = express.Router()

router.route("/login")
    .post(validateUser, login)

router.route("/signup")
    .post(validateUser, signup)

export default router