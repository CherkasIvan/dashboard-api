import { NextFunction, Request, Response } from 'express';

import { IAuthMiddleware } from '@interfaces/middleware/auth.middleware.interface';

export class AuthGuard implements IAuthMiddleware {
	public execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		res.status(401).send('[Error]: Вы не авторизованы');
	}
}
