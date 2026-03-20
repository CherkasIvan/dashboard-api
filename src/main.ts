import { App } from './app.js';
import { UsersController } from './controller/users.controller.js';
import { LoggerService } from './service/logger.service.js';

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new UsersController(logger));
    await app.init();
}

bootstrap();
