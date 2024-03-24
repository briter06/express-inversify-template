import "reflect-metadata"
import { EnvironmentService } from "./environment.service"
import { IEnvironmentVariables } from "./environmentVariables"

describe("Environment variables", () => {
    const realEnvs = process.env
    let environService: EnvironmentService
    const variables: IEnvironmentVariables = {
        loggerlevel: "debug",
        port: "3000",
        rootPath: "/root",
    }

    beforeEach(() => {
        jest.resetModules()
        process.env = realEnvs
        environService = new EnvironmentService()
    })

    test("Valid environment variables", () => {
        process.env = {
            ...process.env,
            LOGGER_LEVEL: variables.loggerlevel,
            PORT: variables.port,
            ROOT_PATH: variables.rootPath,
        }
        const validEnvironment = environService.loadEnvironment()
        expect(validEnvironment.valid).toBe(true)
        expect(environService.getVariables()).toEqual(variables)
    })

    test("Invalid environment variables", () => {
        const validEnvironment = environService.loadEnvironment()
        expect(validEnvironment.valid).toBe(false)
    })
})
