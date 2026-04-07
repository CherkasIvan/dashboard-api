import { type NextFunction, type Request, type Response } from 'express';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import 'reflect-metadata';

import { BaseController } from '@common/base.controller';
import { AuthGuard } from '@common/guard/auth.guard';
import { ValidateMiddleware } from '@common/middleware/validate.middleware';
import { TYPES } from '@helpers/consts/types.const';
import { HttpError } from '@helpers/errors/http.error';
import type { IUsersController } from '@interfaces/controller/users.controller.interface';
import type { IConfigService } from '@interfaces/service/config.service.interface';
import type { ILoggerService } from '@interfaces/service/logger.service.interface';
import type { IUsersService } from '@interfaces/service/users.service.interface';

import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	public constructor(
		@inject(TYPES.ILogger) private loggerService: ILoggerService,
		@inject(TYPES.UsersService) private usersService: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UsersLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UsersRegisterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	public async login(
		req: Request<{}, {}, UsersLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw new HttpError('Необходимы email и password', 401, 'login');
			}

			const isValid = await this.usersService.validateUser(req.body);
			if (!isValid) {
				throw new HttpError('Ошибка авторизации', 401, 'login');
			}

			const secret = this.configService.get<string>('JWT_SECRET');
			const jwt = await this.signJWT(req.body.email, secret);
			this.ok(res, { jwt });
		} catch (error) {
			if (error instanceof HttpError) {
				return next(error);
			}
			return next(new HttpError('Ошибка клиента ' + (error as Error).message, 400, 'login'));
		}
	}

	public async register(
		{ body }: Request<{}, {}, UsersRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.createUser(body);
		console.log(result);
		if (!result) {
			return next(new HttpError('Такой пользователь уже существует', 422, 'register'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	public async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const email = user && typeof user === 'object' ? user.email : null;
		const userInfo = await this.usersService.getUserInfo(email);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id, name: userInfo?.name });
	}

	private signJWT(email: string, secret: string): string {
		return jwt.sign({ email, iat: Math.floor(Date.now() / 1000) }, secret, {
			algorithm: 'HS256',
		});
	}
}
