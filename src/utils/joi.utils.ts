import Joi from "joi"

export const joiEmail = () => Joi.string().email({ tlds: { allow: false } })

export const joiPassword = () =>
    Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?\]]).{10,}$/)
