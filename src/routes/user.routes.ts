import { Router } from 'express';
import { UserController } from '../modules/user/User.controller';
import { UserService } from '../modules/user/User.service';
import { ValidationMiddleware } from '../common/middlewares/Validation.middleware';
import { AuthMiddleware } from '../common/middlewares/Auth.middleware';
import { UserProfileService } from '../modules/user-profile/UserProfile.service';

const router: Router = Router();
const userController: UserController = new UserController(
    UserService.getInstance(),
    UserProfileService.getInstance(),
);
const validationMiddlewares: ValidationMiddleware = new ValidationMiddleware();
const authMiddlewares: AuthMiddleware = new AuthMiddleware();

router.post('/',
    validationMiddlewares.validateEmail,
    validationMiddlewares.validatePassword
, userController.registerUser);

router.get('/',
    authMiddlewares.verifyUserSession
, userController.getUserData);

router.put('/',
    authMiddlewares.verifyUserSession
, userController.updateUserData);

export default router;