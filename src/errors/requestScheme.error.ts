import { APIErrors } from "@enums/apiErrors.enum"
import { APIError } from "./api.error"

export class RequestSchemaError extends APIError {
    constructor(msg: string) {
        super(msg, APIErrors.REQUEST_SCHEMA_ERROR, 400)
        Object.setPrototypeOf(this, RequestSchemaError.prototype)
    }
}
