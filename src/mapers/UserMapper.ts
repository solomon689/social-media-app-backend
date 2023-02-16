import { User } from '../modules/user/User.entity';
import { CreateUserDto } from '../modules/user/dtos/CreateUserDto';
import { Account } from '../modules/account/Account.entity';
import { AccountMapper } from './AccountMapper';
import { BadRequestException } from '../errors/BadRequestException';

export class UserMapper {
    constructor() {

    }
    public static createUserDtoToUserEntity(userDto: CreateUserDto): User {
        let mappedAccount: Account = AccountMapper.createAccountDtoToAccountEntity(userDto.accountInfo);

        return new User({
            name: userDto.name,
            lastname: userDto.lastname,
            account: mappedAccount,
            profile: userDto.profile,
        });
    }

    public static PartialCreateUserDtoToPartialUserEntity(userDto: Partial<CreateUserDto>) {
        const { name, lastname } = userDto;
        const mappedUser: Partial<User> = {
            name: (name) ? name : undefined,
            lastname: (lastname) ? lastname : undefined,
        };

        if (userDto.accountInfo) {
            const account: Partial<Account> = AccountMapper.createAccountDtoToUpdateAccountEntity(userDto.accountInfo);
            mappedUser.account = account as Account;
        }

        return mappedUser;
    }
}