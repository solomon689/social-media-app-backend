import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
export class Database {
    private static instance: Database;
    private dataSource: DataSource;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
        });
    }

    get DataSource(): DataSource {
        return this.dataSource;
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();

            return Database.instance;
        } else {
            return Database.instance;
        }
    }

    public async connectDB(): Promise<void> {
        try {
            await this.dataSource.initialize();
            console.log('Base de datos conectada con exito!');
        } catch (error) {
            console.error('No se ha podido conectar a la base de datos :: ERROR=', error);
        }
    }
}