import { Request, Response } from 'express';
import { IAuthService } from '../../common/interfaces/services/IAuthService.interface';
import { HttpStatus } from '../../common/enums/HttpStatus';
export class AuthController {

    constructor(
        private readonly authService: IAuthService,
    ) {
        this.login = this.login.bind(this);
    }

    public async login(req: Request, res: Response) {
        const email: string = req.body?.email;
        const password: string = req.body?.password;

        try {
            const token: string = await this.authService.login(email, password);

            if (!token) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Credenciales incorrectas',
                    str: 'BAD_REQUEST',
                });
            }

            res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Login exitoso!',
                str: 'OK',
            });
        } catch (error) {
            console.error('Error login =>', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Ha ocurrido un error inesperado',
                str: 'INTERNAL_SERVER_ERROR',
            });  
        }
    }
}