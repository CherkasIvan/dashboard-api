import type { NextFunction, Request, Response } from 'express';

import type { TCrudMethod } from '../types/crud-method.type.js';

export interface IRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: TCrudMethod;
}
