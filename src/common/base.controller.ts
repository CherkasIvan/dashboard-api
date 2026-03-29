import { type Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { Prop } from '@decorators/property.decorator';
import { TYPES } from '@helpers/consts/types.const';
import type { IRoute } from '@interfaces/route.interface';
import type { ILoggerService } from '@interfaces/service/logger.service.interface';

import type { ExpressReturnType } from '../typings/express-return.type';

@injectable()
export abstract class BaseController {
	@Prop()
	private readonly _router!: Router;

	public constructor(@inject(TYPES.ILogger) private logger: ILoggerService) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).send(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IRoute[]): void {
		for (const route of routes) {
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
