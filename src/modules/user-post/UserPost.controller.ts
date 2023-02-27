import { Request, Response, NextFunction } from 'express';
import { IUserPostService } from '../../common/interfaces/services/IUserPostService.instace';
import { UploadedFile } from 'express-fileupload';
import { CreateUserPostDto } from './dtos/CreateUserPost.dto';
import { BadRequestException } from '../../errors/BadRequestException';
import { UserPost } from './entities/UserPost.entity';
import { HttpStatus } from '../../common/enums/HttpStatus';

export class UserPostController {
    constructor(private readonly userPostService: IUserPostService) {
        this.createPost = this.createPost.bind(this);
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        if (!req.body.data) throw new BadRequestException("Debe ingresar la información del post");

        const body: any = JSON.parse(req.body.data);
        const userId: string = body.userId;
        const createUserPostDto: CreateUserPostDto = {
            description: body.description,
            photos: req.files?.photos as UploadedFile[],
        }

        try {
            const newPost: UserPost = await this.userPostService.create(createUserPostDto, userId);
            
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Post creado con exito!',
            });   
        } catch (error) {
            return next(error);
        }
    }
}