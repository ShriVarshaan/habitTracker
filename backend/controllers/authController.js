import {User} from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Redirecting within the api for testing purposes, change to frontend later
export const signup = async (req, res, next) =>{
    const user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(409).json({message: "User exists already"})
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({...req.body, password:hashedPassword})

    await newUser.save()
    const token = jwt.sign(
        {id: user._id},
        process.ENV.JWT_SECRET,
        {expiresIn: "7d"}
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).redirect("/api/habits")
}

export const login = async(req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const match = bcrypt.compare(req.body.password, user.password)

        if(!match){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            {id: user._id},
            process.ENV.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({message: "Logged in successfully"})
    } catch (err){
        next(err)
    }
}