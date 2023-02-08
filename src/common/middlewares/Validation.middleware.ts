import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from '../../modules/user/dtos/CreateUserDto';
import { Validations } from "../../utils/Validations";
import { HttpStatus } from '../enums/HttpStatus';
import { BadRequestException } from '../../errors/BadRequestException';

export class ValidationMiddleware {
    constructor() { }

    public validateEmail(req: Request, res: Response, next: NextFunction) {
        const body: CreateUserDto = req.body;
        const email: string = body.accountInfo.email;

        if (!email) throw new BadRequestException("Debe ingresar un correo electrónico");

        const isValid: boolean = Validations.validateEmail(email);

        if (!isValid) throw new BadRequestException("El formato del correo electrónico es incorrecto");

        return next();
    }

    public validatePassword(req: Request, res: Response, next: NextFunction) {
        const body: CreateUserDto = req.body;
        const password: string = body.accountInfo.password;

        if (!password) throw new BadRequestException("Debe ingresar una contraseña");

        if (password.length < 8) throw new BadRequestException("La contraseña debe tener un mínimo de 8 carácteres");

        if (password.length > 16) throw new BadRequestException("La contraseña debe tener un maximo de 16 carácteres");

        return next();
    }
}