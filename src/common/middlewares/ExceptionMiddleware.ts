import { Request, Response, NextFunction, response } from 'express';
import { CustomException } from '../../errors/CustomException';
import { HttpStatus } from '../enums/HttpStatus';

export class ExceptionMiddleware {
    constructor() { }

    public errorLogger(error: Error, req: Request, res: Response, next: NextFunction) {
        console.log(`error ${ error.message }`);
        return next(error);
    }

    public errorResponse(error: CustomException, req: Request, res: Response, next: NextFunction) {
        const status: number = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

        res.status(status).json({
            statusCode: status,
            message: error.message,
        });
    }
}