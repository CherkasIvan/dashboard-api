import { Prop } from '../../decorators/property.decorator.js';
import { Meta } from '../../metadata/metadata.js';

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
