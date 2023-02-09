import { Account } from '../modules/account/Account.entity';
import { CreateAccountDto } from '../modules/account/dtos/CreateAccount.dto';

export class AccountMapper {
    public static createAccountDtoToAccountEntity(createAccountDto: CreateAccountDto): Account {
        return new Account(
            createAccountDto.email,
            createAccountDto.password,
            createAccountDto.phoneNumber,
            createAccountDto.prefix,
        );
    }
}