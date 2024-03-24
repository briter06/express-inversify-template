import "reflect-metadata"
import { APIErrors } from "@enums/apiErrors.enum"
import { InternalServerError } from "@errors/internalServer.error"
import { RequestSchemaError } from "@errors/requestScheme.error"
import { LoggerService } from "@services/logger/logger.service"
import { createRequest, createResponse } from "node-mocks-http"
import { errorFilter } from "./error.filter"
import { ForbiddenError } from "@errors/forbidden.error"
import { ILoggerService } from "@services/logger"
import { IEnvironmentService } from "@config/env"
import { IEnvironmentVariables } from "@config/env/environmentVariables"

class MockEnvironmentService implements IEnvironmentService {
    loadEnvironment(): { valid: boolean; error?: string | undefined } {
        throw new Error("Method not implemented.")
    }
    getVariables(): IEnvironmentVariables {
        return {
            loggerlevel: "debug",
        } as IEnvironmentVariables
    }
}

describe("Error filter tests", () => {
    const loggerService: ILoggerService = new LoggerService(
        new MockEnvironmentService()
    )

    test("RequestSchemeError", () => {
        const error = new RequestSchemaError("Error")
        const request = createRequest({
            method: "POST",
        })
        const response = createResponse()
        const result = errorFilter(loggerService)(
            error,
            request,
            response,
            () => ({})
        )
        expect(result?.statusCode).toEqual(400)
        expect(error.getResponse().error).toEqual(
            APIErrors.REQUEST_SCHEMA_ERROR
        )
    })

    test("InternalServerError", () => {
        const error = new InternalServerError("Error")
        const request = createRequest({
            method: "POST",
        })
        const response = createResponse()
        const result = errorFilter(loggerService)(
            error,
            request,
            response,
            () => ({})
        )
        expect(result?.statusCode).toEqual(500)
        expect(error.getResponse().error).toEqual(
            APIErrors.INTERNAL_SERVER_ERROR
        )
    })

    test("ForbiddenError", () => {
        const error = new ForbiddenError("Error")
        const request = createRequest({
            method: "POST",
        })
        const response = createResponse()
        const result = errorFilter(loggerService)(
            error,
            request,
            response,
            () => ({})
        )
        expect(result?.statusCode).toEqual(403)
        expect(error.getResponse().error).toEqual(APIErrors.FORBIDDEN)
    })

    test("GenericError", () => {
        const error = new Error("Error")
        const request = createRequest({
            method: "POST",
        })
        const response = createResponse()
        const result = errorFilter(loggerService)(
            error,
            request,
            response,
            () => ({})
        )
        expect(result?.statusCode).toEqual(500)
    })

    test("No error", () => {
        const request = createRequest({
            method: "POST",
        })
        const response = createResponse()
        let res = false
        errorFilter(loggerService)(undefined as any, request, response, () => {
            res = true
        })
        expect(res).toEqual(true)
    })
})
