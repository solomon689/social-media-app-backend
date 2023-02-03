export class UserDto {
    public readonly name!: string;
    public readonly lastname!: string;
    public readonly accountInfo!: {
        email: string;
        phoneNumber?: string;
        prefix?: string;
    }
    public readonly profile: any;
}