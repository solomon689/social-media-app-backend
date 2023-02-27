import { UserPost } from '../../../modules/user-post/entities/UserPost.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UploadedFile } from 'express-fileupload';

export interface IUserPostService {
    create(post: any, userId: string): Promise<UserPost>;
    savePostImage(photo: UploadedFile): Promise<string>;
    deletePostById(postId: string): Promise<DeleteResult>;
    findPosts(): Promise<UserPost>;
    findUserPosts(userId: string): Promise<UserPost[]>;
    findUserPost(userId: string): Promise<UserPost>;
    updateById(postId: string, newData: any): Promise<UpdateResult>;
}