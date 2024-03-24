import { APIErrors } from "@enums/apiErrors.enum"
import { ILoggerService } from "@services/logger"

/**
 * Generic custom error in the API
 */
export class APIError extends Error {
    /**
     * Id of the custom error
     */
    private errorId: APIErrors
    /**
     * Status code of the error
     */
    private statusCode: number

    constructor(msg: string, errorId: APIErrors, statusCode: number) {
        super(msg)
        this.errorId = errorId
        this.statusCode = statusCode
    }

    /**
     * Log the error
     * @param logger Logger services instance
     */
    log(logger: ILoggerService) {
        logger.error(`${this.errorId} ${this.message}`)
    }

    /**
     *
     * @returns Get the status code
     */
    getStatus() {
        return this.statusCode
    }

    /**
     * Generate final response with the error details
     * @returns Response
     */
    getResponse() {
        return {
            data: {},
            error: this.errorId,
        }
    }
}
