import { type Response } from 'express';

export type ExpressReturnType<T = unknown> = Response<T, Record<string, unknown>>;
