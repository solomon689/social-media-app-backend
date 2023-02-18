import { Request, Response, NextFunction } from 'express';
import { Security } from '../../utils/Security';
import { HttpStatus } from '../enums/HttpStatus';
import { BadRequestException } from '../../errors/BadRequestException';

export class AuthMiddleware {
    constructor() { }

    public verifyUserSession(req: Request, res: Response, next: NextFunction) {
        if (!req.cookies?.token) throw new BadRequestException("Debe ingresar un token");

        try {
            const userId = Security.validateUserToken(req.cookies.token);

            if (userId) req.body.userId = userId;
            
            return next();
        } catch (error) {
            return next(error);
        }
    }
}