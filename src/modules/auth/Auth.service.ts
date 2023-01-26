import { Singleton } from '../../common/models/Singleton';
import { IAuthService } from '../../common/interfaces/services/IAuthService.interface';
import { UserService } from '../user/User.service';
import { IAccountService } from '../../common/interfaces/services/IAccountService.interface';
import { Account } from '../account/Account.entity';
import { Security } from '../../utils/Security';
import { AccountService } from '../account/Account.service';
import { IUserService } from '../../common/interfaces/services/IUserService.interface';
import { User } from '../user/User.entity';

export class AuthService extends Singleton implements IAuthService {
    private constructor(
        private readonly userService: IUserService,
    ) {
        super();
    }

    public static getInstance<AuthService>(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService(
                UserService.getInstance(),
            );

            return AuthService.instance;
        } else {
            return AuthService.instance;
        }
    }

    public async login(email: string, password: string): Promise<string | null> {
        const foundUser: User | null = await this.userService.findOneByEmail(email);

        if (foundUser) {
            const isValidPassword: boolean = await Security.verifyPassword(password, foundUser.account.password);

            if (isValidPassword) {
                return Security.createToken<Object>({ id: foundUser.id });
            }
        }

        return null;
    }
}