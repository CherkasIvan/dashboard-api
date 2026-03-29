import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IAuthMiddleware } from '@interfaces/middleware/auth.middleware.interface';

export class AuthMiddleware implements IAuthMiddleware {
	public constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const authHeader = req.headers.authorization;
		if (typeof authHeader === 'string') {
			const parts = authHeader.split(' ');
			if (parts.length === 2 && parts[0] === 'Bearer') {
				const token = parts[1]!;
				try {
					const payload = jwt.verify(token, this.secret);
					if (payload) {
						req.user = payload;
						next();
					}
					return;
				} catch (err) {
					if (err) {
						next();
					}
				}
			}
		}
		next();
	}
}
