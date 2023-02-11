import express, { Application } from "express";
import cors from "cors";
import { Database } from './Database';
import healthRoute from "../routes/health.routes";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import userProfileRoutes from "../routes/userProfile.routes";
import accountRoutes from "../routes/account.routes";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { ExceptionMiddleware } from '../common/middlewares/ExceptionMiddleware';

export class ServerApp {
    private app: Application;
    private exceptionHandler: ExceptionMiddleware;
    private paths = {
        health: '/api/v1/health',
        user: '/api/v1/user',
        auth: '/api/v1/auth',
        userProfile: '/api/v1/user/profile',
        account: '/api/v1/account',
    }

    constructor() {
        this.app = express();
        this.exceptionHandler = new ExceptionMiddleware();
    }

    public async start(port: string): Promise<void> {
        this.app.listen(port, () => console.log('Servidor escuchando en el puerto', port));
        await this.connectDB();
        this.middlewares();
        this.routes();
    }

    private routes(): void {
        this.app.use(this.paths.health, healthRoute);
        this.app.use(this.paths.user, userRoutes);
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.userProfile, userProfileRoutes);
        this.app.use(this.paths.account, accountRoutes);
        this.app.use(this.exceptionHandler.errorLogger);
        this.app.use(this.exceptionHandler.errorResponse);
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: 'tmp',
        }));
    }

    private async connectDB(): Promise<void> {
        const database: Database = Database.getInstance();

        await database.connectDB();
    }
}