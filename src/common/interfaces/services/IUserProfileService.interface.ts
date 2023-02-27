import { UploadedFile } from 'express-fileupload';
import { UserProfile } from '../../../modules/user-profile/UserProfile.entity';
export interface IUserProfileService {
    create(profileData: { userId: string, biography?: string, avatarImage?: UploadedFile, coverImage?: UploadedFile }): Promise<UserProfile | null>;
}