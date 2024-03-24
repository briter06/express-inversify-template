import { APIErrors } from "@enums/apiErrors.enum"
import { APIError } from "./api.error"

export class InvalidEmailError extends APIError {
    constructor(msg: string) {
        super(msg, APIErrors.INVALID_EMAIL, 500)
        Object.setPrototypeOf(this, InvalidEmailError.prototype)
    }
}
