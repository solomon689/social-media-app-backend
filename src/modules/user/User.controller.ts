import { Request, Response, NextFunction } from 'express';
import { id } from "../../../jest.config";
import { HttpStatus } from '../../common/enums/HttpStatus';
import { IUserService } from '../../common/interfaces/services/IUserService.interface';
import { CreateUserDto } from './dtos/CreateUserDto';
import { User } from "./User.entity";
import { UserDto } from './dtos/UserDto';
import { NotFoundException } from '../../errors/NotFoundException';
import { BadRequestException } from '../../errors/BadRequestException';

export class UserController {
    constructor(
        private readonly userService: IUserService,
    ) {
        this.registerUser = this.registerUser.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    public async registerUser(req: Request, res: Response, next: NextFunction) {
        if (!req.body) throw new BadRequestException('Debe ingresar la información del usuario');

        const body: CreateUserDto = req.body;
        
        try {
            await this.userService.create(body);

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Usuario creado con exito!',
            });
        } catch (error) {
            return next(error);
        }
    }

    public async getUserData(req: Request, res: Response, next: NextFunction) {
        const userId: string = req.body.userId;
        
        try {
            const user: User | null = await this.userService.findOneById(userId);

            if (!user) throw new NotFoundException('Usuario no encontrado');

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
            return next(error);
        }
    }
}