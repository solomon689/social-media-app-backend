import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserPost } from './UserPost.entity';

@Entity('user_post_image')
export class UserPostImage {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ type: 'varchar', length: 255 })
    public url!: string;

    @ManyToOne(() => UserPost, (userPost) => userPost.images)
    public userPost!: UserPost;

    constructor(url: string) {        
        this.url = url;
    }
}