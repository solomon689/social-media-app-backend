import { Router } from 'express';
import { UserController } from '../modules/user/User.controller';
import { UserService } from '../modules/user/User.service';
import { ValidationMiddleware } from '../common/middlewares/Validation.middleware';

const router: Router = Router();
const userController: UserController = new UserController(UserService.getInstance());
const validationMiddlewares: ValidationMiddleware = new ValidationMiddleware();

router.post('/',
    validationMiddlewares.validateEmail,
    validationMiddlewares.validatePassword
, userController.registerUser);

export default router;