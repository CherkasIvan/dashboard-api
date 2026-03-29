import express, { type NextFunction, type Request, type Response } from 'express';

// Промежуточный обработчик (middleware) для логирования
const timeLogger = (req: Request, Response: any, next: NextFunction): void => {
	console.log('Время запроса', Date.now());
	next();
};

export { timeLogger };
