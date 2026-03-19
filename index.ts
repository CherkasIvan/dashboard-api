import express, {
    type NextFunction,
    type Request,
    type Response,
} from 'express';

import { HttpError } from './helpers/http-error.js';
import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

// Маршрут /hello для всех методов
app.all('/hello', (req: Request, res: Response) => {
    res.send('All hello');
});

// Маршрут по регулярному выражению (пути, оканчивающиеся на 'a')
app.get(/.*a$/, (req: Request, res: Response) => {
    res.send('Привет всем на А!');
});

// Подключаем роутер пользователей
app.use('/user', userRouter);

// Мидлвэр для обработки ошибок приложения
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new HttpError('Маршрут не найден');
    err.status = 404;
    next(err); // передаём ошибку в обработчик ошибок
});

// Обработчик ошибок (уже есть)
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    const status = err.status || 500;
    res.status(status).send(err.message);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
