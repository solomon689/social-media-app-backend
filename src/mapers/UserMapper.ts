import { User } from '../modules/user/User.entity';
import { CreateUserDto } from '../modules/user/dtos/CreateUserDto';
import { Account } from '../modules/account/Account.entity';
import { AccountMapper } from './AccountMapper';

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
}