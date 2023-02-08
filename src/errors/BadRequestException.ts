import { HttpStatus } from '../common/enums/HttpStatus';
import { CustomException } from './CustomException';

export class BadRequestException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}