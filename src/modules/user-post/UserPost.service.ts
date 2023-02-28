import { Singleton } from '../../common/models/Singleton';
import { IUserPostService } from '../../common/interfaces/services/IUserPostService.instace';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { UserPost } from './entities/UserPost.entity';
import { CreateUserPostDto } from '../user-post/dtos/CreateUserPost.dto';
import { Database } from '../../config/Database';
import { UploadedFile } from 'express-fileupload';
import { Cloudinary } from '../../utils/Cloudinary';
import { UserPostImage } from './entities/UserPostImage.entity';
import { User } from '../user/User.entity';
import { IUserService } from '../../common/interfaces/services/IUserService.interface';
import { UserService } from '../user/User.service';
import { BadRequestException } from '../../errors/BadRequestException';
import { NotFoundException } from '../../errors/NotFoundException';

export class UserPostService extends Singleton implements IUserPostService {
    private constructor(
        private readonly userPostRepository: Repository<UserPost>,
        private readonly userPostImageRepository: Repository<UserPostImage>,
        private readonly userService: IUserService,
    ) {
        super();
    }

    public static getInstance<UserPostService>(): UserPostService {
        if (!UserPostService.instance) {
            UserPostService.instance = new UserPostService(
                Database.getInstance().DataSource.getRepository(UserPost),
                Database.getInstance().DataSource.getRepository(UserPostImage),
                UserService.getInstance(),
            );
        }

        return UserPostService.instance;
    }

    public async create(post: CreateUserPostDto, userId: string): Promise<UserPost> {
        const user: User | null = await this.userService.findOneById(userId);

        const userPost: UserPost = {
            description: post.description,
            user: user as User,
            images: [],
        }
        const newPost: UserPost = await this.userPostRepository.save(userPost);
        const postImages: UserPostImage[] = [];

        for (let i = 0; i < post.photos?.length; i++) {
            const postImageUrl: string = await this.savePostImage(post.photos[i], newPost.id);
            const postImage: UserPostImage = {
                url: postImageUrl,
                userPost: newPost,
            };
            const createdPostImage: UserPostImage = await this.userPostImageRepository.save(postImage);

            postImages.push(createdPostImage);
        }

        newPost.images = postImages;

        return newPost;
    }

    public async savePostImage(photo: UploadedFile, identifier?: string): Promise<string> {
        if (photo) {
            const postImageUrl: string = await Cloudinary.uploadPostImage(photo, identifier);

            return postImageUrl;
        }

        return "";
    }

    public async updateById(postId: string, newData: Partial<UserPost>): Promise<UpdateResult> {
        const post: UserPost | null = await this.findPostById(postId);

        if (!post) throw new NotFoundException('El post que se desea actualizar no existe');

        return await this.userPostRepository
            .createQueryBuilder()
            .update(UserPost)
            .set({ description: newData.description })
            .where('id = :id', { id: postId })
            .execute();
    }

    public async deletePostById(postId: string): Promise<DeleteResult> {
        return await this.userPostRepository.delete({ id: postId });
    }

    public async findUserPosts(userId: string): Promise<UserPost[]> {
        throw new Error('Method not implemented.');
    }

    public async findUserPost(userId: string): Promise<UserPost> {
        throw new Error('Method not implemented.');
    }
    
    public async findPosts(): Promise<UserPost[]> {
        throw new Error('Method not implemented.');
    }

    public async findPostById(postId: string): Promise<UserPost | null> {
        return await this.userPostRepository.findOne({
            where: { id: postId },
            relations: { images: true }
        });
    }
}