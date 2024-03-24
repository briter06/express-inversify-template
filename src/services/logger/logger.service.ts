import { TYPE } from "@config/ioc/types"
import { inject } from "inversify"
import { getLogger, Logger } from "log4js"
import morgan from "morgan"
import { StatusCodes } from "http-status-codes"
import { IEnvironmentService } from "@config/env"
import { ILoggerService } from "."
import { provide } from "inversify-binding-decorators"

@provide(TYPE.ILoggerService)
export class LoggerService implements ILoggerService {
    private logger: Logger

    constructor(
        @inject(TYPE.IEnvironmentService)
        private environService: IEnvironmentService
    ) {
        const level = this.environService.getVariables().loggerlevel
        this.logger = getLogger()
        this.logger.level = level
    }

    public debug(message: any) {
        this.logger.debug(message)
    }

    public info(message: any) {
        this.logger.info(message)
    }

    public error(message: any) {
        this.logger.error(message)
    }

    public getMorganMiddleware() {
        return morgan(
            ":method :url | Status: :status | Response time: :response-time ms",
            {
                skip: (_, res) => {
                    return res.statusCode !== StatusCodes.OK
                },
                stream: {
                    write: (message: string) => {
                        this.logger.info(message.trim())
                    },
                },
            }
        )
    }
}
