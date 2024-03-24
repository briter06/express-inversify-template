import { JOIErrors } from "@enums/joiErrors.enum"
import { InvalidEmailError } from "@errors/invalidEmail.error"
import { InvalidPasswordError } from "@errors/invalidPassword.error"
import { RequestSchemaError } from "@errors/requestScheme.error"
import * as express from "express"
import Joi from "joi"

/**
 * Middleware to valide joi structure in the body of the request
 * @param joiScheme Joi scheme instance
 * @returns New middleware function
 */
export const joiBodyValidator = (joiScheme: Joi.ObjectSchema) => {
    return (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const validationResult = joiScheme.validate(req.body)
        if (validationResult.error) {
            throw processCustomJoiErrors(req, validationResult.error, "Body")
        } else {
            next()
        }
    }
}

/**
 * Middleware to valide joi structure in the query of the request
 * @param joiScheme Joi scheme instance
 * @returns New middleware function
 */
export const joiQueryValidator = (joiScheme: Joi.ObjectSchema) => {
    return (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const validationResult = joiScheme.validate(req.query)
        if (validationResult.error) {
            throw processCustomJoiErrors(req, validationResult.error, "Query")
        } else {
            next()
        }
    }
}

/**
 * Middleware to valide joi structure in the parameters of the request
 * @param joiScheme Joi scheme instance
 * @returns New middleware function
 */
export const joiParamsValidator = (joiScheme: Joi.ObjectSchema) => {
    return (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const validationResult = joiScheme.validate(req.params)
        if (validationResult.error) {
            throw processCustomJoiErrors(req, validationResult.error, "Params")
        } else {
            next()
        }
    }
}

/**
 * Process custom JOI errors
 * @param req Request object
 * @param error JOI error
 * @param origin Origin of the error
 * @returns Custom error instance
 */
const processCustomJoiErrors = (
    req: express.Request,
    error: Joi.ValidationError,
    origin: string
) => {
    const message = `${req.url} | ${error.message} | ${origin}`
    const valErr = `${error.details[0]?.context?.label}#${error.details[0]?.type}`
    switch (valErr) {
        case JOIErrors.INVALID_EMAIL:
            return new InvalidEmailError(message)
        case JOIErrors.INVALID_PASSWORD:
            return new InvalidPasswordError(message)
        default:
            return new RequestSchemaError(message)
    }
}
