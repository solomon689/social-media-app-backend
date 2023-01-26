import { Request, Response } from 'express';
import { UserProfileService } from './UserProfile.service';
import cloudinary from "cloudinary";
import { UploadedFile } from 'express-fileupload';
import { HttpStatus } from '../../common/enums/HttpStatus';

cloudinary.v2.config(process.env.CLOUDINARY_URL || '');

export class UserProfileController {
    constructor(
        private readonly userProfileService: UserProfileService,
    ) {
        this.createProfile = this.createProfile.bind(this);
    }

    public async createProfile(req: Request, res: Response) {
        const userId: string = req.query.userId as string;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const avatar: UploadedFile = req.files.avatar as UploadedFile;
        const createdProfile = await this.userProfileService.create(avatar);

        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'perfil creado con exito',
        });
    }    
}