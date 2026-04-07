import request from 'supertest';

import { App } from '../app.js';
import { boot } from '../main.js';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'john@gmail.com', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'john@gmail.com', password: '4414' });
		expect(res.body.jwt).not.toBeUndefined;
	});

	it('Login - error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'john@gmail.com', password: '111' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john@gmail.com', password: '4414' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.email).toBe('john@gmail.com');
	});

	it('Info - error', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john@gmail.com', password: '4414' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 1`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(async () => {
	await application.close();
});
