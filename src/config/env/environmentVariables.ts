import Joi from "joi"

export interface IEnvironmentVariables {
    loggerlevel: string
    port: string
    rootPath: string
}

export const environmentSchema = Joi.object()
    .keys({
        LOGGER_LEVEL: Joi.string().required(),
        PORT: Joi.string().required(),
        ROOT_PATH: Joi.string().required(),
    })
    .unknown()
