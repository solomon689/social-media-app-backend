import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { HttpStatus } from '../../common/enums/HttpStatus';
import { IUserProfileService } from '../../common/interfaces/services/IUserProfileService.interface';

export class UserProfileController {
    constructor(
        private readonly userProfileService: IUserProfileService,
    ) {
        this.createProfile = this.createProfile.bind(this);
    }

    public async createProfile(req: Request, res: Response) {
        const userId: string = req.query.userId as string;
    
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        
        const avatarImage: UploadedFile = req.files.avatar as UploadedFile;
        const coverImage: UploadedFile = req.files.avatar as UploadedFile;

        try {
            const createdProfile = await this.userProfileService.create({ biography: req.body.biography, avatarImage, coverImage });

            if (createdProfile) return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Perfil creado con exito!',
                data: createdProfile,
            });
        } catch (error) {
            console.error(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Ha ocurrido un error inesperado',
            })
        }
    }    
}