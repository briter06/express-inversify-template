import "reflect-metadata"
import { LoggerService } from "./logger.service"
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

describe("Logger tests", () => {
    test("Logger construction", () => {
        const loggerService: LoggerService = new LoggerService(
            new MockEnvironmentService()
        )
        expect(loggerService).toBeDefined()
    })

    test("Logger test methods", () => {
        const loggerService: LoggerService = new LoggerService(
            new MockEnvironmentService()
        )
        loggerService.debug("Debug")
        loggerService.error("Error")
        loggerService.info("Info")
        loggerService.getMorganMiddleware()
    })
})
