import { Request, Response } from "express";
import { HttpStatus } from '../../common/enums/HttpStatus';
import { IUserService } from './interfaces/IUserService.interface';
import { CreateUserDto } from './dtos/UserDto';

export class UserController {
    constructor(
        private readonly userService: IUserService,
    ) {
        this.registerUser = this.registerUser.bind(this);
    }

    public async registerUser(req: Request, res: Response) {
        if (!req.body) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Debe ingresar la información del usuario',
            });
        }

        const body: CreateUserDto = req.body;
        
        try {
            await this.userService.create(body);

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Usuario creado con exito!',
            });
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Ha ocurrido un error inesperado al momento de la creación',
            });
        }
    }
}