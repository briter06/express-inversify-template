import { TYPE } from "@config/ioc/types"
import { joiBodyValidator } from "@middlewares/joi/joi.middleware"
import * as express from "express"
import { inject } from "inversify"
import {
    interfaces,
    controller,
    request,
    response,
    next,
    httpPost,
} from "inversify-express-utils"
import { IHelloService } from "@services/hello"
import Joi from "joi"
import { APIResponse } from "src/schema/APIResponse"

/**
 * Hello controller specifying the route of the controller
 */
@controller("/hello")
export class HelloController implements interfaces.Controller {
    constructor(
        @inject(TYPE.IHelloService) private helloService: IHelloService
    ) {}

    /**
     * Post handler
     * @param req Request object
     * @param _res Response object
     * @param _next Next middlerware function
     * @returns Object with the greeting data
     */
    @httpPost(
        "/",
        joiBodyValidator(
            Joi.object().keys({
                name: Joi.string().required(),
            })
        )
    )
    public async greet(
        @request() req: express.Request,
        @response() _res: express.Response,
        @next() _next: express.NextFunction
    ): Promise<APIResponse> {
        const result = this.helloService.greet(req.body.name)
        return {
            data: {
                greeting: result,
            },
        }
    }
}
