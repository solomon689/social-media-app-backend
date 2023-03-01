import { Request, Response, NextFunction } from 'express';
import { IUserPostService } from '../../common/interfaces/services/IUserPostService.instace';
import { UploadedFile } from 'express-fileupload';
import { CreateUserPostDto } from './dtos/CreateUserPost.dto';
import { BadRequestException } from '../../errors/BadRequestException';
import { UserPost } from './entities/UserPost.entity';
import { HttpStatus } from '../../common/enums/HttpStatus';
import { UnauthorizeException } from '../../errors/UnauthorizeException';
import { UpdateResult } from 'typeorm';
import { NotFoundException } from '../../errors/NotFoundException';

export class UserPostController {
    constructor(private readonly userPostService: IUserPostService) {
        this.createPost = this.createPost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.getUserPosts = this.getUserPosts.bind(this);
        this.getUserPost = this.getUserPost.bind(this);
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body.data) throw new BadRequestException("Debe ingresar la información del post");

            const body: { description: string } = JSON.parse(req.body.data);
            const userId: string = req.body.userId;

            if (!userId) throw new UnauthorizeException("El usuario se debe encontrar logeado para realizar esta acción");

            const createUserPostDto: CreateUserPostDto = {
                description: body.description,
                photos: req.files?.photos as UploadedFile[],
            }

            const newPost: UserPost = await this.userPostService.create(createUserPostDto, userId);
            
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Post creado con exito!'
            });   
        } catch (error) {
            return next(error);
        }
    }

    public async editPost(req: Request, res: Response, next: NextFunction) {
        try {
            const body: Partial<UserPost> = req.body;
            const postId: string = req.params.postId;
            const updatedPost: UpdateResult = await this.userPostService.updateById(postId, body);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Post actualizado con exito!',
            });
        } catch (error) {
            return next(error);
        }
    }

    public async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postId: string = req.params.id;

            if (!postId) throw new BadRequestException('Debe ingresar el id del post a eliminar');

            await this.userPostService.deletePostById(postId);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Post eliminado con exito!',
            })
        } catch (error) {
            return next(error);
        }
    }

    public async getUserPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: string = req.body.userId;
            const posts: UserPost[] = await this.userPostService.findUserPosts(userId);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Información obtenida con exito!',
                data: posts,
            });
        } catch (error) {
            return next(error);
        }
    }

    public async getUserPost(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: string = req.body.userId;
            const postId: string = req.params.postId;
            const post: UserPost | null = await this.userPostService.findUserPost(userId, postId);

            if (!post) throw new NotFoundException('El post no existe');

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Información obtenida con exita!',
                data: post,
            });
        } catch (error) {
            return next(error);
        }
    }
}