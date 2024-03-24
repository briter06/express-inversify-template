import "reflect-metadata"
import "module-alias/register"
import "dotenv/config"
import * as bodyParser from "body-parser"
import { InversifyExpressServer } from "inversify-express-utils"
import { container } from "@config/ioc/inversify.config"
import { EnvironmentService } from "@config/env/environment.service"
import { TYPE } from "@config/ioc/types"
import { errorFilter } from "@middlewares/error/error.filter"
import { LoggerService } from "@services/logger/logger.service"
import { STATUS } from "@enums/status.enum"
import helmet from "helmet"
import cors from "cors"
import { IEnvironmentService } from "@config/env"
import { ILoggerService } from "@services/logger"

// Initialize environment
const environmentService: IEnvironmentService = new EnvironmentService()
const loadedEnvironment = environmentService.loadEnvironment()
if (!loadedEnvironment.valid) {
    throw new Error(loadedEnvironment.error)
}

// Initialize logger
const loggerService: ILoggerService = new LoggerService(environmentService)

// Bind services
container
    .bind<IEnvironmentService>(TYPE.IEnvironmentService)
    .toConstantValue(environmentService)
container
    .bind<ILoggerService>(TYPE.ILoggerService)
    .toConstantValue(loggerService)

// create server
const server = new InversifyExpressServer(container, null, {
    rootPath: environmentService.getVariables().rootPath,
})
server.setConfig((app) => {
    // add body parser
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )
    app.use(bodyParser.json())
    // add morgan logger middleware
    app.use(loggerService.getMorganMiddleware())
    // add helmet middlewares
    app.use(helmet())
    // add cors middleware
    app.use(
        cors({
            origin: "*",
        })
    )
    // add health endpoint
    app.get("/", (req, res) => res.status(200).send({ api: STATUS.SUCCESS }))
})

// Set error middleware handler
server.setErrorConfig((app) => {
    app.use(errorFilter(loggerService))
})

// Initialize the server
const serverApp = server.build()
const port = environmentService.getVariables().port
serverApp.listen(port, () => {
    loggerService.info(`HTTP Server listening in port ${port}`)
})
