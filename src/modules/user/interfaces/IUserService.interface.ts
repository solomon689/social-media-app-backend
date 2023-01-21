export interface IUserService {
    create(user:any): Promise<void>;
}