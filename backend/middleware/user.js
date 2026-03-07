import { userSchemaJoi } from "../models/User.js"

export const validateUser = async (req, res, next) => {
    const {error} = userSchemaJoi.validate(req.body, {abortEarly: false})

    if (error){
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({error: errorMessages})
    }

    next()
}