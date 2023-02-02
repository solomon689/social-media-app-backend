import { Router } from 'express';
import { UserProfileController } from '../modules/user-profile/UserProfile.controller';
import { UserProfileService } from '../modules/user-profile/UserProfile.service';

const router: Router = Router();
const userProfileController: UserProfileController = new UserProfileController(
    UserProfileService.getInstance(),
);

router.post('/image', userProfileController.createProfile);

export default router;