import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { HttpStatus } from '../../common/enums/HttpStatus';
import { IUserProfileService } from '../../common/interfaces/services/IUserProfileService.interface';

export class UserProfileController {
    constructor(
        private readonly userProfileService: IUserProfileService,
    ) {
        this.createProfile = this.createProfile.bind(this);
    }

    public async createProfile(req: Request, res: Response, next: NextFunction) {
        const userId: string = req.query.userId as string;
    
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const body = req.body.data;
        const avatarImage: UploadedFile = req.files?.avatar as UploadedFile;
        const coverImage: UploadedFile = req.files?.avatar as UploadedFile;

        try {
            // const createdProfile = await this.userProfileService.create({ biography: req.body.biography, avatarImage, coverImage });

            if (true) return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Perfil creado con exito!',
                // data: createdProfile,
            });
        } catch (error) {
            return next(error);
        }
    }    
}