import { User } from '../../../modules/user/User.entity';

export interface IUserService {
    create(user:any): Promise<void>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneById(userId: string): Promise<User | null>;
}