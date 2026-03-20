import { type NextFunction, type Request, type Response } from 'express';

import { BaseController } from '../common/base.controller.js';
import { LoggerService } from '../service/logger.service.js';

export class UsersController extends BaseController {
    constructor(loggerService: LoggerService) {
        super(loggerService);

        this.bindRoutes([
            { path: '/login', method: 'post', func: this.login },
            { path: '/register', method: 'post', func: this.register },
        ]);
    }

    public login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login');
    }

    public register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
}
