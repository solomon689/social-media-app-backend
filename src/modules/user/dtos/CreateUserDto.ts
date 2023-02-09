import { CreateAccountDto } from '../../account/dtos/CreateAccount.dto';
export class CreateUserDto {
    public readonly name!: string;
    public readonly lastname!: string;
    public readonly accountInfo!: CreateAccountDto;
    public readonly profile?: any;
}