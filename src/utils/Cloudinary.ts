import cloudinary from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

export namespace Cloudinary {
    cloudinary.v2.config(process.env.CLOUDINARY_URL || '');

    export const uploadAvatarImage = async (avatarImage: UploadedFile, identifier?: string): Promise<string> => {
        if (!avatarImage) throw new Error('No se ingreso una imagen para su subida');

        const { secure_url } = await cloudinary.v2.uploader.upload(avatarImage.tempFilePath, {
            public_id: identifier,
            folder: 'avatars/' + identifier,
            responsive_breakpoints: {
                create_derived: true,
                bytes_step: 20000,
                min_width: 200,
                max_width: 1000
            },
        });

        return secure_url;
    }

    export const uploadCoverImage = async (coverImage: UploadedFile, identifier?: string): Promise<string> => {
        if (!coverImage) throw new Error('No se ingreso una imagen para su subida');

        const { secure_url } = await cloudinary.v2.uploader.upload(coverImage.tempFilePath, {
            public_id: identifier,
            folder: 'covers/' + identifier,
            responsive_breakpoints: {
                create_derived: true,
                bytes_step: 10000,
                min_width: 800,
                max_width: 1600
            },
        });

        return secure_url;
    }
}