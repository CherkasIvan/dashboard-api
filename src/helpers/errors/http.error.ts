import 'reflect-metadata';

import { Prop } from '@decorators/property.decorator';
import { Meta } from '@metadata/metadata';

@Meta
export class HttpError extends Error {
	@Prop()
	public statusCode: number;

	@Prop()
	public name: string;

	@Prop()
	public context?: string;

	public constructor(message: string, statusCode: number, context?: string) {
		super(message);
		this.statusCode = statusCode;
		this.name = 'HttpError';
		if (context) {
			this.context = context;
		}
	}
}
