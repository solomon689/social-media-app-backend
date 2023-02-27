import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserProfile } from '../user-profile/UserProfile.entity';
import { Account } from '../account/Account.entity';
import { UserPost } from '../user-post/entities/UserPost.entity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    public name!: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    public lastname!: string;

    @OneToOne(() => UserProfile)
    @JoinColumn()
    public profile!: UserProfile;

    @OneToOne(() => Account, { cascade: true, eager: true })
    @JoinColumn()
    public account!: Account;

    @OneToMany(() => UserPost, (post) => post.user)
    public posts!: UserPost[];

    constructor(user: User) {
        Object.assign(this, user);
    }
}