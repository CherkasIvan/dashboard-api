import { type NextFunction, type Request, type Response } from 'express';

import { BaseController } from '../common/base.controller.js';
import { Controller } from '../decorators/controller.decorator.js';
import { LoggerDecorator } from '../decorators/logger.decorator.js';
import { HttpError } from '../helpers/errors/http.error.js';
import { LoggerService } from '../service/logger.service.js';

@LoggerDecorator()
@Controller()
export class UsersController extends BaseController {
    constructor(loggerService: LoggerService) {
        super(loggerService);

        this.bindRoutes([
            { path: '/login', method: 'post', func: this.login },
            { path: '/register', method: 'post', func: this.register },
        ]);
    }

    public login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new HttpError(
                    'Необходимы email и password',
                    400,
                    'login',
                );
            }
            this.ok(res, 'login success');
        } catch (error) {
            next(new HttpError('Необходимы email и password', 401, 'login'));
        }
    }

    public register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register success');
    }
}
