import { Account } from '../../../modules/account/Account.entity';
import { UpdateResult } from 'typeorm';

export interface IAccountService {
    create(accountInfo: any): Promise<Account>;
    findOneByEmail(email: string): Promise<Account | null>;
    findOneByUserId(userId: string): Promise<Account | null>;
    deleteAccount(accountId: string): Promise<UpdateResult>;
    recoverDeletedAccount(email: string): Promise<any>;
}