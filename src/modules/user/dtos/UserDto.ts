export class CreateUserDto {
    public readonly name!: string;
    public readonly lastname!: string;
    public readonly accountInfo!: {
        email: string;
        password: string;
        phoneNumber?: string;
        prefix?: string;
    }
    public readonly profile?: any;
}