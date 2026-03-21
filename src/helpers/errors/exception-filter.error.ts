import type { NextFunction, Request, Response } from 'express';

import { LoggerDecorator } from '../../decorators/logger.decorator.js';
import { Prop } from '../../decorators/property.decorator.js';
import type { IExceptionFilter } from '../../interfaces/exception-filter.interface.js';
import { Meta } from '../../metadata/metadata.js';
import type { LoggerService } from '../../service/logger.service.js';
import { HttpError } from './http.error.js';

@Meta
@LoggerDecorator()
export class ExceptionFilerError implements IExceptionFilter {
    @Prop()
    public logger!: LoggerService;
    public constructor(loggerService: LoggerService) {
        this.logger = loggerService;
    }

    catch(
        err: Error | HttpError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        if (err instanceof HttpError) {
            this.logger.error(
                `[${err.context}] Ошибка:${err.statusCode}: ${err?.message}`,
            );
            res.status(err.statusCode).send({ err: err.message });
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send({ err: err.message });
        }
    }
}
