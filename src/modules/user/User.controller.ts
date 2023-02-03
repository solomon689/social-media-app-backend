import { Request, Response } from "express";
import { id } from "../../../jest.config";
import { HttpStatus } from '../../common/enums/HttpStatus';
import { IUserService } from '../../common/interfaces/services/IUserService.interface';
import { CreateUserDto } from './dtos/CreateUserDto';
import { User } from "./User.entity";
import { UserDto } from './dtos/UserDto';

export class UserController {
    constructor(
        private readonly userService: IUserService,
    ) {
        this.registerUser = this.registerUser.bind(this);
        this.getUserData = this.getUserData.bind(this);
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

    public async getUserData(req: Request, res: Response) {
        const userId: string = req.body.userId;
        
        try {
            const user: User = await this.userService.findOneById(userId);
            const userDto: UserDto = {
                name: user.name,
                lastname: user.lastname,
                accountInfo: {
                    email: user.account.email,
                    phoneNumber: user.account.phoneNumber,
                    prefix: user.account.prefix,
                },
                profile: null,
            }
            
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Petición realizada con exito!',
                data: userDto,
            });
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: HttpStatus.NOT_FOUND,
                error,
            });
        }
    }
}