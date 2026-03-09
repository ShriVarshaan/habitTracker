import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
import Joi from "joi"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose.default)

const userSchemaJoi = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({tlds: {allow: false}}).required(), //tlds is saying ignore the .com, .org part of the email
    password: Joi.string().alphanum().min(8).max(128).required()
})

const userSchemaLoginJoi = Joi.object({
    email: Joi.string().email({tlds: {allow: false}}).required(), //tlds is saying ignore the .com, .org part of the email
    password: Joi.string().alphanum().min(8).max(128).required()
})

const User = mongoose.model("User", userSchema)

// const trialUser = new User({email: "varshaanvijay@gmail.com", username: "hello there"})

// trialUser.save()
//     .catch((err) => {
//         console.log(err)
//     })

export {User, userSchemaJoi, userSchemaLoginJoi}
