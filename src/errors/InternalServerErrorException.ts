import { HttpStatus } from '../common/enums/HttpStatus';
import { CustomException } from './CustomException';

export class InternalServerErrorException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}