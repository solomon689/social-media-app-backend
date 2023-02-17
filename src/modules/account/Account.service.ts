import { Singleton } from '../../common/models/Singleton';
import { Security } from '../../utils/Security';
import { Account } from './Account.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Database } from '../../config/Database';
import { IAccountService } from '../../common/interfaces/services/IAccountService.interface';
import { NotFoundException } from '../../errors/NotFoundException';
import { ConflictException } from '../../errors/ConflictException';

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

    public async findOneById(accountId: string): Promise<Account | null> {
        return await this.accountRepository.findOne({ where: { id: accountId }});
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

    public async updateEmail(accountId: string, newEmail: string): Promise<UpdateResult> {
        const accountExist: Account | null = await this.findOneById(accountId);
        const emailExist: Account | null = await this.findOneByEmail(newEmail);

        if (!accountExist) throw new NotFoundException('La cuenta que desea actualizar no existe');
        if (emailExist) throw new ConflictException('El correo electrónico ingresado ya se encuentra registrado');
        
        return await this.accountRepository.update(
            { id: accountId },
            { email: newEmail }
        );
    }

    public async updatePassword(accountId: string, newPassword: string): Promise<UpdateResult> {
        const account: Account | null = await this.findOneById(accountId);

        if (account) {
            const isSameOldPassword: boolean = await Security.verifyPassword(newPassword, account.password);

            if (isSameOldPassword) throw new ConflictException('La nueva contraseña debe ser distinta a la anterior');

            const hashedNewPassword: string = await Security.hashPassword(newPassword);

            return await this.accountRepository.update({
                id: accountId,
            }, { password: hashedNewPassword });
        } else {
            throw new NotFoundException('La cuenta no existe');
        }
    }
}