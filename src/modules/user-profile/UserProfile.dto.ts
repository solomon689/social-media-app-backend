import { UploadedFile } from 'express-fileupload';
export class UserProfileDto {
    public readonly biography!: string;
    public readonly avatarImage!: UploadedFile;
    public readonly coverImage!: UploadedFile;

    constructor(biography: string, avatarImage: UploadedFile, coverImage: UploadedFile) {
        this.biography = biography;
        this.avatarImage = avatarImage;
        this.coverImage = coverImage;
    }
}