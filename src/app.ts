import express, {
    type Express,
    type NextFunction,
    type Request,
    type Response,
} from 'express';
import { Server } from 'http';

import type { UsersController } from './controller/users.controller.js';
import { LoggerDecorator } from './decorators/logger.decorator.js';
import { Prop } from './decorators/property.decorator.js';
import type { ExceptionFilerError } from './helpers/errors/exception-filter.error.js';
import type { ILogger } from './interfaces/logger.interface.js';
import { Meta } from './metadata/metadata.js';

@Meta
@LoggerDecorator()
export class App {
    @Prop()
    public app: Express;

    @Prop()
    public server!: Server;

    @Prop()
    public port: number;

    @Prop()
    public logger!: ILogger;

    @Prop()
    public usersController!: UsersController;

    @Prop()
    public exceptionFilter!: ExceptionFilerError;

    public constructor(
        loggerService: ILogger,
        usersController: UsersController,
        exceptionFilterError: ExceptionFilerError,
    ) {
        this.app = express();
        this.app.use(express.json());
        this.port = 8000;
        this.logger = loggerService;
        this.usersController = usersController;
        this.exceptionFilter = exceptionFilterError;
    }

    public useRoutes() {
        this.app.use('/users', this.usersController.router);
    }

    public useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
