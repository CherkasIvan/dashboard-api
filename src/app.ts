import express, {
    type Express,
    type NextFunction,
    type Request,
    type Response,
} from 'express';
import { Server } from 'http';

import type { UsersController } from './controller/users.controller.js';
import { LoggerService } from './service/logger.service.js';

export class App {
    public app: Express;
    public server!: Server;
    public port: number;
    public logger!: LoggerService;
    public usersController!: UsersController;

    public constructor(
        loggerService: LoggerService,
        usersController: UsersController,
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = loggerService;
        this.usersController = usersController;
    }

    public useRoutes() {
        this.app.use('/users', this.usersController.router);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
