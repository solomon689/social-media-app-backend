import { Account } from '../../../modules/account/Account.entity';

export interface IAccountService {
    create(accountInfo: any): Promise<Account>;
    findOneByEmail(email: string): Promise<Account | null>;
}