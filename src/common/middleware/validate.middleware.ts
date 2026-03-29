import type { ClassConstructor } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

import type { IValidateMiddleware } from '@interfaces/middleware/validate-middleware.interface';

export class ValidateMiddleware implements IValidateMiddleware {
	public constructor(private classToValidate: ClassConstructor<Object>) {}

	public execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors: ValidationError[]) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
