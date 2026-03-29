import type { NextFunction, Request, Response } from 'express';

import type { TCrudMethod } from '../typings/crud-method.type.ts';
import type { IValidateMiddleware } from './middleware/validate-middleware.interface.ts';

export interface IRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: TCrudMethod;
	middlewares?: IValidateMiddleware[];
}
