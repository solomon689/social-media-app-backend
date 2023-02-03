import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from '../../modules/user/dtos/CreateUserDto';
import { Validations } from "../../utils/validations";
import { HttpStatus } from '../enums/HttpStatus';

export class ValidationMiddleware {
    constructor() { }

    public validateEmail(req: Request, res: Response, next: NextFunction) {
        const body: CreateUserDto = req.body;
        const email: string = body.accountInfo.email;

        if (!email) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Debe ingresar un correo electrónico',
            });
        }

        const isValid: boolean = Validations.validateEmail(email);

        if (!isValid) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'El formato del correo electrónico es incorrecto'
            });
        }

        return next();
    }

    public validatePassword(req: Request, res: Response, next: NextFunction) {
        const body: CreateUserDto = req.body;
        const password: string = body.accountInfo.password;

        if (!password) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Debe ingresar una contraseña',
            });
        }

        if (password.length < 8) return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'La contraseña debe tener un minímo de 8 carácteres',
        });

        if (password.length > 16) return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'La contraseña debe tener un maximo de 16 carácteres',
        });

        return next();
    }
}