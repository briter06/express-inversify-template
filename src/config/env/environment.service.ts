import { IEnvironmentService } from "."
import {
    environmentSchema,
    IEnvironmentVariables,
} from "./environmentVariables"

/**
 * Class for the environment service
 */
export class EnvironmentService implements IEnvironmentService {
    /**
     * Attribute with the environment variables
     */
    private variables!: IEnvironmentVariables

    /**
     * Load the environment variables
     * @returns Object notifying if the load was successful
     */
    public loadEnvironment(): { valid: boolean; error?: string } {
        const validationResult = environmentSchema.validate(process.env)
        if (validationResult.error) {
            return { valid: false, error: validationResult.error.message }
        }
        this.variables = {
            loggerlevel: validationResult.value.LOGGER_LEVEL,
            port: validationResult.value.PORT,
            rootPath: validationResult.value.ROOT_PATH,
        }
        return { valid: true }
    }

    /**
     * Returns the environment variables
     * @returns Environment variables
     */
    public getVariables(): IEnvironmentVariables {
        return this.variables
    }
}
