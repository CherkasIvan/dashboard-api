import { Container, ContainerModule, type ContainerModuleLoadOptions } from 'inversify';

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
import { ConfigService } from '@service/config.service';
import { LoggerService } from '@service/logger.service';
import { UsersService } from '@service/users.service';

import { App } from './app';

export const appContainerBinding = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILoggerService>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	options.bind<IExceptionFilter>(TYPES.ExceptionFilterError).to(ExceptionFilterError);
	options.bind<IUsersController>(TYPES.UsersController).to(UsersController);
	options.bind<IUsersService>(TYPES.UsersService).to(UsersService);
	options.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	options.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	options.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	options.bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appContainerBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
