import { HttpStatus } from '../common/enums/HttpStatus';
import { CustomException } from './CustomException';

export class ForbiddenException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.FORBIDDEN, message);
    }
}