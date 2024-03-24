import { IEnvironmentVariables } from "./environmentVariables"

/**
 * Interface for the environment service
 */
export interface IEnvironmentService {
    /**
     * Load the environment based on the environment variables
     */
    loadEnvironment(): { valid: boolean; error?: string }

    /**
     * Get the environment variables
     */
    getVariables(): IEnvironmentVariables
}
