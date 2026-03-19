import express, {
    type NextFunction,
    type Request,
    type Response,
} from 'express';

import { timeLogger } from '../middleware/logger.js';

const userRouter = express.Router();

// Подмаршрут /user/login
userRouter.route('/login').get(timeLogger, (req: Request, res: Response) => {
    res.send('Привет user get!');
});

// Подмаршрут /user/login
userRouter
    .route('/register')
    .post(timeLogger, (req: Request, res: Response) => {
        res.send({ success: true, register: 'registered new user' });
    });

// Корневой маршрут /user
userRouter
    .route('/')
    .get((req: Request, res: Response) => {
        res.send('Список пользователей');
    })
    .post((req: Request, res: Response) => {
        res.status(333).send({ success: true, register: 'registered' });
    })
    .put((req: Request, res: Response) => {
        res.redirect('/aaaaa');
    })
    .patch((req: Request, res: Response) => {
        res.append('Warning', '1111').end();
    })
    .delete((req: Request, res: Response) => {
        res.type('application/json').end();
    });

export { userRouter };
