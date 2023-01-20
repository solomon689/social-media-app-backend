import "reflect-metadata";
import dotenv from "dotenv";
import { ServerApp } from './config/ServerApp';

dotenv.config();

const server: ServerApp = new ServerApp();

server.start(process.env.PORT || '3000');