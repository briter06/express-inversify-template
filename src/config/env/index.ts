import { IEnvironmentVariables } from "./environmentVariables"

export interface IEnvironmentService {
    loadEnvironment(): { valid: boolean; error?: string }

    getVariables(): IEnvironmentVariables
}
