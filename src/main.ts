import { Container, ContainerModule } from 'inversify';

import 'reflect-metadata';

import { UsersRepository } from '@controller/repositories/users.repository';
import { UsersController } from '@controller/users.controller';
import { PrismaService } from '@database/prisma.service';
import { TYPES } from '@helpers/consts/types.const';
import { ExceptionFilterError } from '@helpers/errors/exception-filter.error';
import type { IBootstrapReturn } from '@interfaces/bootstrap.interface';
import type { IUsersController } from '@interfaces/controller/users.controller.interface';
import type { IExceptionFilter } from '@interfaces/exception-filter.interface';
import type { IConfigService } from '@interfaces/service/config.service.interface';
import type { ILoggerService } from '@interfaces/service/logger.service.interface';
import type { IUsersService } from '@interfaces/service/users.service.interface';
import { ConfigService } from '@service/config/config.service';
import { LoggerService } from '@service/logger/logger.service';
import { UsersService } from '@service/users/users.service';

import { App } from './app';

export const appContainerBinding = new ContainerModule((bind, unbind, isBound, rebind) => {
	bind<ILoggerService>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilterError).to(ExceptionFilterError);
	bind<IUsersController>(TYPES.UsersController).to(UsersController);
	bind<IUsersService>(TYPES.UsersService).to(UsersService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appContainerBinding);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}
export const boot = bootstrap();
