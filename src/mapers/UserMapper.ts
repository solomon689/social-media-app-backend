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
        const mappedUser: Partial<User> = {};
        const validProperties: string[] = ['name', 'lastname', 'profile'];
        
        for (const property in userDto) {
            if (validProperties.indexOf(property) === -1) continue;

            (mappedUser as any)[property] = (userDto as any)[property];    
        }

        return mappedUser;
    }
}