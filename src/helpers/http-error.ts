export class HttpError extends Error {
    public status: number;
    public name: string;
    public constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}
