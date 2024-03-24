import { APIErrors } from "@enums/apiErrors.enum"
import { APIError } from "./api.error"

export class InternalServerError extends APIError {
    constructor(msg: string) {
        super(msg, APIErrors.INTERNAL_SERVER_ERROR, 500)
        Object.setPrototypeOf(this, InternalServerError.prototype)
    }
}
