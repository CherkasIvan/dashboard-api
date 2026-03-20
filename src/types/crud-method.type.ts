import type { Router } from 'express';

export type TCrudMethod = keyof Pick<
    Router,
    'get' | 'post' | 'put' | 'patch' | 'delete'
>;
