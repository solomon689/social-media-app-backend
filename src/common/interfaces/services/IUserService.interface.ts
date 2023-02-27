import { User } from '../../../modules/user/User.entity';

export interface IUserService {
    create(user:any): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneById(userId: string): Promise<User | null>;
    updateById(userId: string, newUserDate: Partial<User>): Promise<any>;
}