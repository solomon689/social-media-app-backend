import { Request, Response, NextFunction } from 'express';
import { IAccountService } from '../../common/interfaces/services/IAccountService.interface';
import { Account } from './Account.entity';
import { UpdateResult } from 'typeorm';
import { NotFoundException } from '../../errors/NotFoundException';
import { HttpStatus } from '../../common/enums/HttpStatus';
import { BadRequestException } from '../../errors/BadRequestException';

export class AccountController {
    constructor(
        private accountService: IAccountService,
    ) {
        this.deleteAccount = this.deleteAccount.bind(this);
        this.recoverDeleteAccount = this.recoverDeleteAccount.bind(this);
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction) {
        const userId: string = req.body.userId;

        try {
            const account: Account| null = await this.accountService.findOneByUserId(userId);

            if (!account) throw new NotFoundException('La cuenta no existe dentro de la base de datos');

            const deletedAccount: UpdateResult = await this.accountService.deleteAccount(account.id as string);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Cuenta eliminada con exito!',
            });
        } catch (error) {
            return next(error);
        }
    }

    public async recoverDeleteAccount(req: Request, res: Response, next: NextFunction) {
        const email: string = req.body.email;
        
        if (!email) throw new BadRequestException('Se debe ingresar un correo electrónico para restablecer la cuenta');

        try {
            const recoverAccount: UpdateResult = await this.accountService.recoverDeletedAccount(email);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Cuenta reestablecida con exito!',
            });
        } catch (error) {
            return next(error);
        }
    }
}