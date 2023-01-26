import { Router } from 'express';
import { AuthController } from '../modules/auth/Auth.controller';
import { AuthService } from '../modules/auth/Auth.service';

const router: Router = Router();
const authController: AuthController = new AuthController(
    AuthService.getInstance(),
);

router.post('/login', authController.login);

export default router;