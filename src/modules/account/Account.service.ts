import { Singleton } from '../../common/models/Singleton';
import { Security } from '../../utils/Security';
import { Account } from './Account.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Database } from '../../config/Database';
import { IAccountService } from '../../common/interfaces/services/IAccountService.interface';
import { NotFoundException } from '../../errors/NotFoundException';

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

    public async findOneByEmail(email: string): Promise<Account | null> {
        return await this.accountRepository.findOne({
            where: { email },
            withDeleted: true,
        });
    }

    public async findOneByUserId(userId: string): Promise<Account | null> {
        return await this.accountRepository.createQueryBuilder('account')
            .innerJoinAndSelect("account.user", "user")
            .where("user.id = :userId", { userId })
            .getOne();
    }

    public async deleteAccount(accountId: string): Promise<UpdateResult> {
        return await this.accountRepository.softDelete({
            id: accountId,
        });
    }

    public async recoverDeletedAccount(email: string): Promise<UpdateResult> {
        const account: Account | null = await this.findOneByEmail(email);

        if (!account) throw new NotFoundException('El email no se encuentra asociado a una cuenta');

        return await this.accountRepository.restore({ email });
    }
}