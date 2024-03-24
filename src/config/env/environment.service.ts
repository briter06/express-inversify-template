import { IEnvironmentService } from "."
import {
    environmentSchema,
    IEnvironmentVariables,
} from "./environmentVariables"

export class EnvironmentService implements IEnvironmentService {
    private variables!: IEnvironmentVariables

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

    public getVariables(): IEnvironmentVariables {
        return this.variables
    }
}
