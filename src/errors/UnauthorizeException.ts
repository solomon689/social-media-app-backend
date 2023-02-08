import { HttpStatus } from '../common/enums/HttpStatus';
import { CustomException } from './CustomException';

export class UnauthorizeException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}