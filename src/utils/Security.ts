import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export namespace Security {
    export const hashPassword = async (password: string): Promise<string> => {
        const saltRounds: number = 10;
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
        return await bcrypt.compare(password, hashedPassword);
    }

    export const createToken = <T>(payload: T): string => {
        const jwtPassword: string = process.env.JWT_PASSWORD || '';

        return jwt.sign(<any>payload, jwtPassword, {expiresIn: '24h'});
    }
}