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

@controller("/hello")
export class HelloController implements interfaces.Controller {
    constructor(
        @inject(TYPE.IHelloService) private helloService: IHelloService
    ) {}

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
        @response() res: express.Response,
        @next() nextf: express.NextFunction
    ): Promise<any> {
        const result = this.helloService.greet(req.body.name)
        return {
            data: result,
        }
    }
}
