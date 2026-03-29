import express, { type Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { AuthMiddleware } from '@common/middleware/auth.middleware';
import type { UsersController } from '@controller/users.controller';
import type { PrismaService } from '@database/prisma.service';
import { TYPES } from '@helpers/consts/types.const';
import type { IExceptionFilter } from '@interfaces/exception-filter.interface';
import type { ILoggerService } from '@interfaces/service/logger.service.interface';
import type { ConfigService } from '@service/config.service';

@injectable()
export class App {
	public app: Express;
	public server!: Server;
	public port: number;

	public constructor(
		@inject(TYPES.ILogger) private loggerService: ILoggerService,
		@inject(TYPES.UsersController) private usersController: UsersController,
		@inject(TYPES.ExceptionFilterError)
		private exceptionFilterError: IExceptionFilter,
		@inject(TYPES.PrismaService)
		private prismaService: PrismaService,
		@inject(TYPES.ConfigService)
		private configService: ConfigService,
	) {
		this.app = express();
		this.app.use(express.json());
		this.port = this.configService.get('PORT');
	}

	public useMiddleware(): void {
		const authMiddleware = new AuthMiddleware(this.configService.get('JWT_SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	public useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	public useExceptionFilter(): void {
		this.app.use(this.exceptionFilterError.catch.bind(this.exceptionFilterError));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.loggerService.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
