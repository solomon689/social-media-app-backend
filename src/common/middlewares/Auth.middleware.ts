import { Request, Response, NextFunction } from 'express';
import { Security } from '../../utils/Security';
import { HttpStatus } from '../enums/HttpStatus';

export class AuthMiddleware {
    constructor() { }

    public verifyUserSession(req: Request, res: Response, next: NextFunction) {
        if (!req.cookies?.token) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Debe ingresar un token',
            });
        }

        try {
            const userId = Security.validateUserToken(req.cookies.token);

            if (userId) {
                req.body.userId = userId;
            }
            
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.UNAUTHORIZED).json({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'La sesión expiró',
            });
        }

        return next();
    }
}