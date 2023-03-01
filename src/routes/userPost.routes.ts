import { Router } from 'express';
import { UserPostController } from '../modules/user-post/UserPost.controller';
import { UserPostService } from '../modules/user-post/UserPost.service';
import { AuthMiddleware } from '../common/middlewares/Auth.middleware';

const router: Router = Router();
const userPostController: UserPostController = new UserPostController(
    UserPostService.getInstance(),
);
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.post('/',
    authMiddleware.verifyUserSession
, userPostController.createPost);

router.put('/:postId',
    authMiddleware.verifyUserSession
, userPostController.editPost);

router.delete('/delete/:id',
    authMiddleware.verifyUserSession
, userPostController.deletePost);

router.get('/user-posts', 
    authMiddleware.verifyUserSession
, userPostController.getUserPosts);

router.get('/user-post/:postId',
    authMiddleware.verifyUserSession
, userPostController.getUserPost);

export default router;