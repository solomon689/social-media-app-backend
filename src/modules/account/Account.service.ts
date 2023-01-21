import { Singleton } from '../../common/models/Singleton';
import { Security } from '../../utils/Security';
import { Account } from './Account.entity';
import { Repository } from 'typeorm';
import { Database } from '../../config/Database';
import { IAccountService } from './interfaces/IAccountService.interface';

export class AccountService extends Singleton implements IAccountService {
    private constructor(
        private readonly accountRepository: Repository<Account>,
    ) {
        super();
    }

    public static getInstance<AccountService>(): AccountService {
        if (!AccountService.instance) {
            AccountService.instance = new AccountService(
                Database.getInstance().DataSource.getRepository(Account),
            );

            return AccountService.instance;
        } else {
            return AccountService.instance;
        }
    }

    public async create(accountInfo: any): Promise<Account> {
        const hashedPassword: string = await Security.hashPassword(accountInfo.password);
        const newAccount: Account = new Account(
            accountInfo.email, 
            hashedPassword, 
            accountInfo.phoneNumber,
            accountInfo.prefix,
        );

        return await this.accountRepository.save(newAccount);
    }
}