import { Account } from '../../../modules/account/Account.entity';
import { UpdateResult } from 'typeorm';

export interface IAccountService {
    create(accountInfo: any): Promise<Account>;
    findOneById(accountId: string): Promise<Account | null>;
    findOneByEmail(email: string): Promise<Account | null>;
    findOneByUserId(userId: string): Promise<Account | null>;
    deleteAccount(accountId: string): Promise<UpdateResult>;
    recoverDeletedAccount(email: string): Promise<UpdateResult>;
    updateEmail(accountId: string, newEmail: string): Promise<UpdateResult>;
    updatePassword(accountId: string, newPassword: string): Promise<UpdateResult>;
}