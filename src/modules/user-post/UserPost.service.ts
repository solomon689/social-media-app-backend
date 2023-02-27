import { Singleton } from '../../common/models/Singleton';
import { IUserPostService } from '../../common/interfaces/services/IUserPostService.instace';
import { UpdateResult, DeleteResult, Repository, InsertResult } from 'typeorm';
import { UserPost } from './entities/UserPost.entity';
import { CreateUserPostDto } from '../user-post/dtos/CreateUserPost.dto';
import { Database } from '../../config/Database';
import { UploadedFile } from 'express-fileupload';
import { Cloudinary } from '../../utils/Cloudinary';
import { UserPostImage } from './entities/UserPostImage.entity';
import { User } from '../user/User.entity';
import { IUserService } from '../../common/interfaces/services/IUserService.interface';
import { UserService } from '../user/User.service';

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

    public async updateById(postId: string, newData: any): Promise<UpdateResult> {
        throw new Error('Method not implemented.');
    }

    public deletePostById(postId: string): Promise<DeleteResult> {
        throw new Error('Method not implemented.');
    }

    public findUserPosts(userId: string): Promise<UserPost[]> {
        throw new Error('Method not implemented.');
    }

    public findUserPost(userId: string): Promise<UserPost> {
        throw new Error('Method not implemented.');
    }
    
    public findPosts(): Promise<UserPost> {
        throw new Error('Method not implemented.');
    }
}