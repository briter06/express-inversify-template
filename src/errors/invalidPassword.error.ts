import { APIErrors } from "@enums/apiErrors.enum"
import { APIError } from "./api.error"

export class InvalidPasswordError extends APIError {
    constructor(msg: string) {
        super(msg, APIErrors.INVALID_PASSWORD, 500)
        Object.setPrototypeOf(this, InvalidPasswordError.prototype)
    }
}
