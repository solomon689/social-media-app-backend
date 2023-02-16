import { Router } from 'express';
import { AccountController } from '../modules/account/Account.controller';
import { AccountService } from '../modules/account/Account.service';
import { AuthMiddleware } from '../common/middlewares/Auth.middleware';

const router: Router = Router();
const accountController: AccountController = new AccountController(
    AccountService.getInstance(),
);
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.delete('/', 
    authMiddleware.verifyUserSession
, accountController.deleteAccount);

router.post('/recover', accountController.recoverDeleteAccount);

router.patch('/email-update', accountController.updateEmailAccount);

export default router;