import { Account } from '../Account.entity';

export interface IAccountService {
    create(accountInfo: any): Promise<Account>;
}