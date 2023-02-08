import { Repository } from "typeorm";
import { IUserService } from "../../common/interfaces/services/IUserService.interface";
import { User } from './User.entity';
import { Database } from '../../config/Database';
import { CreateUserDto } from './dtos/CreateUserDto';
import { Account } from '../account/Account.entity';
import { AccountService } from '../account/Account.service';
import { Singleton } from '../../common/models/Singleton';
import { IAccountService } from '../../common/interfaces/services/IAccountService.interface';

export class UserService extends Singleton implements IUserService {
    private constructor(
        private readonly userRepository: Repository<User>,
        private readonly accountService: IAccountService,
    ) {
        super();
    }

    public static getInstance<UserService>(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService(
                Database.getInstance().DataSource.getRepository(User),
                AccountService.getInstance(),
            );

            return UserService.instance;
        } else {
            return UserService.instance;
        }
    }

    public async create(user: CreateUserDto): Promise<void> {
        const newUser: User = new User(user.name, user.lastname);
        const newAccount: Account = await this.accountService.create(user.accountInfo);

        newUser.account = newAccount;

        await this.userRepository.save(newUser);
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { account: { email } },
            relations: { account: true }
        });
    }

    public async findOneById(userId: string): Promise<User | null> {
        const userData: User | null = await this.userRepository.findOne(
            { 
                where: { id: userId },
                relations: {
                    account: true,
                    profile: true,
                } 
            }
        );

        return userData;
    }
}