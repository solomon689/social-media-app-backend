import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserPostImage } from './UserPostImage.entity';
import { User } from '../../user/User.entity';

@Entity('user_post')
export class UserPost {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ type: 'text', nullable: true })
    public description!: string;

    @OneToMany(() => UserPostImage, (images) => images.userPost)
    public images!: UserPostImage[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn()
    public user!: User;

    constructor(description: string) {
        this.description = description;
    }
}