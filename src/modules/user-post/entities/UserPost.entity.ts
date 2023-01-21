import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPostImage } from './UserPostImage.entity';

@Entity('user_post')
export class UserPost {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ type: 'text', nullable: true })
    public description!: string;

    @OneToMany(() => UserPostImage, (images) => images.userPost)
    public images!: UserPostImage[];
}