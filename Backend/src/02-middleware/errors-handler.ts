import { NextFunction, Request, Response } from "express";
import config from "../01-utils/config";
import logger from "../01-utils/log-helper";
import ErrorModel from "../03-models/error-model";


function errorsHandler(err: any, request: Request, response: Response, next: NextFunction): void {

    if (err instanceof Error) {
        logger.error(err.message)
        //We don't want the frontend to see sensitive information (about our database for example).
        const msg = config.isDevelopment ? err.message : 'Some error occurred, please try again...'
        response.status((err as any).status || 500).send(msg)
        return
    }

    if (err instanceof ErrorModel) {
        logger.info(err.message)
        response.status(err.status).send(err.message)
        return
    }
}

export default errorsHandler