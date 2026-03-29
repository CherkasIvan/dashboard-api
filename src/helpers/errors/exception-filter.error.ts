import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import type { IExceptionFilter } from '@interfaces/exception-filter.interface.js';
import type { ILoggerService } from '@interfaces/service/logger.service.interface.js';

import { TYPES } from '../consts/types.const.js';
import { HttpError } from './http.error.js';

@injectable()
export class ExceptionFilterError implements IExceptionFilter {
	public constructor(@inject(TYPES.ILogger) private loggerService: ILoggerService) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.loggerService.error(`[${err.context}] Ошибка:${err.statusCode}: ${err?.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.loggerService.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
