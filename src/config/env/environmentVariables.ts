import Joi from "joi"

/**
 * Interface with the environment variables
 */
export interface IEnvironmentVariables {
    loggerlevel: string
    port: string
    rootPath: string
}

/**
 * Joi schema of the environment variables
 */
export const environmentSchema = Joi.object()
    .keys({
        LOGGER_LEVEL: Joi.string().required(),
        PORT: Joi.string().required(),
        ROOT_PATH: Joi.string().required(),
    })
    .unknown()
