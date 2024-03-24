import "reflect-metadata"
import { InvalidEmailError } from "@errors/invalidEmail.error"
import { InvalidPasswordError } from "@errors/invalidPassword.error"
import Joi from "joi"
import { createRequest, createResponse } from "node-mocks-http"
import {
    joiBodyValidator,
    joiParamsValidator,
    joiQueryValidator,
} from "./joi.middleware"
import { joiEmail, joiPassword } from "@utils/joi.utils"

describe("Joi Validator Tests", () => {
    test("Validate correct schema - body", () => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        })
        const request = createRequest({
            body: {
                name: "Name",
            },
        })
        const response = createResponse()
        let error
        try {
            const result = joiBodyValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeFalsy()
    })

    test("Validate incorrect schema - body", () => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        })
        const request = createRequest({
            body: {},
        })
        const response = createResponse()
        let error
        try {
            const result = joiBodyValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeTruthy()
    })

    test("Validate correct schema - query", () => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        })
        const request = createRequest({
            query: {
                name: "Name",
            },
        })
        const response = createResponse()
        let error
        try {
            const result = joiQueryValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeFalsy()
    })

    test("Validate incorrect schema - query", () => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        })
        const request = createRequest({
            query: {},
        })
        const response = createResponse()
        let error
        try {
            const result = joiQueryValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeTruthy()
    })

    test("Validate correct schema - params", () => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        })
        const request = createRequest({
            params: {
                name: "Name",
            },
        })
        const response = createResponse()
        let error
        try {
            const result = joiParamsValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeFalsy()
    })

    test("Validate incorrect schema - params", () => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        })
        const request = createRequest({
            params: {},
        })
        const response = createResponse()
        let error
        try {
            const result = joiParamsValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeTruthy()
    })

    test("Validate email custom error - Valid", () => {
        const schema = Joi.object().keys({
            username: joiEmail().label("email"),
        })
        const request = createRequest({
            body: {
                username: "test@test.com",
            },
        })
        const response = createResponse()
        let error
        try {
            const result = joiBodyValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeFalsy()
    })

    test("Validate email custom error - Invalid", () => {
        const schema = Joi.object().keys({
            username: joiEmail().label("email"),
        })
        const request = createRequest({
            body: {
                username: "invalid",
            },
        })
        const response = createResponse()
        let error
        try {
            const result = joiBodyValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeTruthy()
        expect(error).toBeInstanceOf(InvalidEmailError)
    })

    test("Validate password custom error - Valid", () => {
        const schema = Joi.object().keys({
            password: joiPassword().label("password"),
        })
        const request = createRequest({
            body: {
                password: "Us#er12345",
            },
        })
        const response = createResponse()
        let error
        try {
            const result = joiBodyValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeFalsy()
    })

    test("Validate email custom error - Invalid", () => {
        const schema = Joi.object().keys({
            password: joiPassword().label("password"),
        })
        const request = createRequest({
            body: {
                password: "us#er12345",
            },
        })
        const response = createResponse()
        let error
        try {
            const result = joiBodyValidator(schema)
            result(request, response, () => ({}))
        } catch (err) {
            error = err
        }
        expect(error).toBeTruthy()
        expect(error).toBeInstanceOf(InvalidPasswordError)
    })
})
