import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_profile')
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @Column({ type: 'text', nullable: true })
    public biography!: string;

    @Column({ type: 'text', nullable: true, name: 'profile_img' })
    public profileImg!: string;

    @Column({ type: 'text', nullable: true, name: 'cover_img' })
    public coverImg!: string;

    constructor() {
        
    }
}