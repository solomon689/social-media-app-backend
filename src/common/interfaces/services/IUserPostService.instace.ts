import { UserPost } from '../../../modules/user-post/entities/UserPost.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UploadedFile } from 'express-fileupload';

export interface IUserPostService {
    create(post: any, userId: string): Promise<UserPost>;
    savePostImage(photo: UploadedFile): Promise<string>;
    deletePostById(postId: string): Promise<DeleteResult>;
    findPosts(): Promise<UserPost[]>;
    findPostById(postId: string): Promise<UserPost | null>
    findUserPosts(userId: string): Promise<UserPost[]>;
    findUserPost(userId: string, postId: string): Promise<UserPost | null>;
    updateById(postId: string, newData: any): Promise<UpdateResult>;
}