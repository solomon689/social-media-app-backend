import { Router } from 'express';
import { UserPostController } from '../modules/user-post/UserPost.controller';
import { UserPostService } from '../modules/user-post/UserPost.service';

const router: Router = Router();
const userPostController: UserPostController = new UserPostController(
    UserPostService.getInstance(),
);

router.post('/', userPostController.createPost);

export default router;