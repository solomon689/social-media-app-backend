import { Singleton } from '../../common/models/Singleton';
import { IUserProfileService } from '../../common/interfaces/services/IUserProfileService.interface';
import { Repository } from 'typeorm';
import { UserProfile } from './UserProfile.entity';
import { Database } from '../../config/Database';
import { UploadedFile } from 'express-fileupload';
import cloudinary from 'cloudinary';
import { Cloudinary } from '../../utils/Cloudinary';

export class UserProfileService extends Singleton implements IUserProfileService {
    private constructor(
        private readonly userProfileRepository: Repository<UserProfile>,
    ) {
        super();
    }

    public static getInstance<UserProfileService>(): UserProfileService {
        if (!UserProfileService.instance) {
            UserProfileService.instance = new UserProfileService(
                Database.getInstance().DataSource.getRepository(UserProfile),
            );

            return UserProfileService.instance;
        } else {
            return UserProfileService.instance;
        }
    }

    public async create(profileInfo: { 
        userId: string,
        biography?: string, 
        avatarImage?: UploadedFile, 
        coverImage?: UploadedFile 
    }): Promise<UserProfile | null> {
        let avatarImageUrl: string | undefined = undefined;
        let coverImageUrl: string | undefined = undefined;

        if (profileInfo.avatarImage) avatarImageUrl = await Cloudinary.uploadAvatarImage(profileInfo.avatarImage, profileInfo.userId);
        if (profileInfo.coverImage) coverImageUrl = await Cloudinary.uploadCoverImage(profileInfo.coverImage, profileInfo.userId);

        if (avatarImageUrl || coverImageUrl || profileInfo.biography) {
            const createdProfile: UserProfile = await this.userProfileRepository.save({
                profileImg: avatarImageUrl,
                coverImg: coverImageUrl,
                biography: profileInfo.biography,
            });

            return createdProfile;
        }
        
        return null;
    }
}