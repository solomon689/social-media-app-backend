import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserProfile } from '../user-profile/UserProfile.entity';
import { Account } from '../account/Account.entity';

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

    @OneToOne(() => Account)
    @JoinColumn()
    public account!: Account;

    constructor(user: User) {
        Object.assign(this, user);
    }
}