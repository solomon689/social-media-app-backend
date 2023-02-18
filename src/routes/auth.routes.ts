import { Router } from 'express';
import { AuthController } from '../modules/auth/Auth.controller';
import { AuthService } from '../modules/auth/Auth.service';
import { AuthMiddleware } from '../common/middlewares/Auth.middleware';

const router: Router = Router();
const authController: AuthController = new AuthController(
    AuthService.getInstance(),
);
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.post('/login', authController.login);
router.post('/logout', 
    authMiddleware.verifyUserSession
, authController.logout);

export default router;