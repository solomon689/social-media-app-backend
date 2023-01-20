import express, { Application } from "express";
import cors from "cors";
import healthRoute from "../routes/health.routes";
import { Database } from './Database';

export class ServerApp {
    private app: Application;
    private paths = {
        health: '/api/v1/health',
    }

    constructor() {
        this.app = express();
    }

    public async start(port: string): Promise<void> {
        this.app.listen(port, () => console.log('Servidor escuchando en el puerto', port));
        await this.connectDB();
        this.routes();
        this.middlewares();
    }

    private routes(): void {
        this.app.use(this.paths.health, healthRoute);
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private async connectDB(): Promise<void> {
        const database: Database = Database.getInstance();

        await database.connectDB();
    }
}