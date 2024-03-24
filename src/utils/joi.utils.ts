import Joi from "joi"

/**
 * Custom email joi validator
 * @returns Joi object
 */
export const joiEmail = () => Joi.string().email({ tlds: { allow: false } })

/**
 * Custom password joi validator
 * @returns Joi object
 */
export const joiPassword = () =>
    Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?\]]).{10,}$/)
