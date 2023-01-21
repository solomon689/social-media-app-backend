import bcrypt from 'bcrypt';

export namespace Security {
    export const hashPassword = async (password: string): Promise<string> => {
        const saltRounds: number = 10;
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        return hashedPassword;
    }
}