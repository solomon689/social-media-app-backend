import { CustomException } from './CustomException';
import { HttpStatus } from '../common/enums/HttpStatus';

export class ConflictException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.CONFLICT, message);
    }
}