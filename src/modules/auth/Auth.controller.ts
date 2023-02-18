import { Request, Response, NextFunction } from 'express';
import { IAuthService } from '../../common/interfaces/services/IAuthService.interface';
import { HttpStatus } from '../../common/enums/HttpStatus';
import { BadRequestException } from '../../errors/BadRequestException';
export class AuthController {

    constructor(
        private readonly authService: IAuthService,
    ) {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const email: string = req.body?.email;
        const password: string = req.body?.password;

        try {
            const token: string = await this.authService.login(email, password);

            if (!token) throw new BadRequestException('Credenciales incorrectas');

            res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Login exitoso!',
                str: 'OK',
            });
        } catch (error) {
            return next(error);  
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token');

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Sesión cerrada con exito!',
            });
        } catch (error) {
            return next(error);
        }
    }
}