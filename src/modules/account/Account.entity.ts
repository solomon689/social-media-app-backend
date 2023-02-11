import { Column, PrimaryGeneratedColumn, Entity, DeleteDateColumn, OneToOne } from 'typeorm';
import { User } from '../user/User.entity';

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    public email!: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    public password!: string;

    @Column({ type: 'varchar', length: 20, nullable: true, name: 'phone_number' })
    public phoneNumber?: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    public prefix?: string;

    @DeleteDateColumn()
    public deletedAt!: Date;

    @OneToOne(() => User, (user) => user.account)
    public user!: User;

    constructor(email: string, password: string, phoneNumber?: string, prefix?: string) {
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.prefix = prefix;
    }
}