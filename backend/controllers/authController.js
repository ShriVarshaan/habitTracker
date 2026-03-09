import {User} from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

//Redirecting within the api for testing purposes, change to frontend later
export const signup = async (req, res, next) =>{
    const user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(409).json({message: "User exists already"})
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({...req.body, hash:hashedPassword})
    await newUser.save()
    const token = jwt.sign(
        {id: newUser._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )

    return res.status(201).json({
        message: "created successfully",
        token: token,
        user: { id: newUser._id, email: newUser.email }
    })
}

export const login = async(req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email}).select('+hash')

        if(!user){
            return res.status(404).json({message: "Invalid credentials"})
        }

        const match = await bcrypt.compare(req.body.password, user.hash)

        if(!match){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        return res.status(200).json({
        message: "logged in",
        token: token,
        user: { id: user._id, email: user.email }
    })
    } catch (err){
        next(err)
    }
}