import { Singleton } from '../../common/models/Singleton';
import { IUserProfileService } from '../../common/interfaces/services/IUserProfileService.interface';
import { Repository } from 'typeorm';
import { UserProfile } from './UserProfile.entity';
import { Database } from '../../config/Database';
import { UploadedFile } from 'express-fileupload';
import cloudinary from 'cloudinary';

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

    public async create(profileImage: UploadedFile): Promise<any> {
        const { tempFilePath } = <UploadedFile>profileImage;
        const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);
        const createdProfile: UserProfile = await this.userProfileRepository.save({
            profileImg: secure_url,
        });

        return createdProfile;
    }
}