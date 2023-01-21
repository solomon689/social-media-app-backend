import { Repository } from "typeorm";
import { IUserService } from "./interfaces/IUserService.interface";
import { User } from './User.entity';
import { Database } from '../../config/Database';
import { CreateUserDto } from './dtos/UserDto';
import { Account } from '../account/Account.entity';
import { AccountService } from '../account/Account.service';
import { Singleton } from '../../common/models/Singleton';
import { IAccountService } from '../account/interfaces/IAccountService.interface';

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
}