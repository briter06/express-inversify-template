import { APIErrors } from "@enums/apiErrors.enum"
import { APIError } from "./api.error"

export class ForbiddenError extends APIError {
    constructor(msg: string) {
        super(msg, APIErrors.FORBIDDEN, 403)
        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
}
