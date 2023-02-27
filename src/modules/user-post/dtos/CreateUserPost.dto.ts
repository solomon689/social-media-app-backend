import { UploadedFile } from 'express-fileupload';

export class CreateUserPostDto {
    public readonly description!: string;
    public readonly photos!: UploadedFile[];
}