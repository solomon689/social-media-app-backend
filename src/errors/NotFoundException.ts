import { HttpStatus } from '../common/enums/HttpStatus';
import { CustomException } from './CustomException';

export class NotFoundException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.NOT_FOUND, message);
    }
}