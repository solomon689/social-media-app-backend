import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/enums/HttpStatus';
import { IUserService } from '../../common/interfaces/services/IUserService.interface';
import { CreateUserDto } from './dtos/CreateUserDto';
import { User } from "./User.entity";
import { UserDto } from './dtos/UserDto';
import { NotFoundException } from '../../errors/NotFoundException';
import { BadRequestException } from '../../errors/BadRequestException';
import { UserMapper } from '../../mapers/UserMapper';
import { UploadedFile } from 'express-fileupload';
import { IUserProfileService } from '../../common/interfaces/services/IUserProfileService.interface';
import { UserProfile } from '../user-profile/UserProfile.entity';
import { InternalServerErrorException } from '../../errors/InternalServerErrorException';

export class UserController {
    constructor(
        private readonly userService: IUserService,
        private readonly userProfileService: IUserProfileService,
    ) {
        this.registerUser = this.registerUser.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
    }

    public async registerUser(req: Request, res: Response, next: NextFunction) {
        if (!req.body.data) throw new BadRequestException('Debe ingresar la información del usuario');

        const body: CreateUserDto = JSON.parse(req.body.data);
        const avatarImage: UploadedFile = req.files?.avatar as UploadedFile;
        const coverImage: UploadedFile = req.files?.coverImage as UploadedFile;

        try {
            const newUser: User = await this.userService.create(body);

            if (!newUser) throw new InternalServerErrorException('Ha ocurrido un error inesperado al momento de la creación');

            const newProfile: UserProfile | null = await this.userProfileService.create({
                avatarImage,
                coverImage,
                userId: newUser.id as string,
            });

            if (newProfile) {
                await this.userService.updateById(newUser.id as string, { profile: newProfile });
            }

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

    public async updateUserData(req: Request, res: Response, next: NextFunction) {
        const userId: string = req.body.userId;
        const userDto: Partial<CreateUserDto> = req.body;

        try {
            const mappedUser: Partial<User> = UserMapper.PartialCreateUserDtoToPartialUserEntity(userDto);
            
            // TODO: Revisar como omitir el asignar userId desde el body.
            if (!mappedUser) throw new BadRequestException('Debe ingresar información para actualizar'); 

            await this.userService.updateById(userId, mappedUser);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Información actualizada con exito!',
            });
        } catch (error) {
            next(error);
        }
    }
}