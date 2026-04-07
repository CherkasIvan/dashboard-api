import { Container } from 'inversify';

import 'reflect-metadata';

import { UserEntity } from '@controller/entity/user.entity';
import { UserModel } from '@generated/prisma';
import { TYPES } from '@helpers/consts/types.const';
import type { IUsersRepository } from '@interfaces/repository/users.repository.interface';
import { IConfigService } from '@interfaces/service/config.service.interface';
import { IUsersService } from '@interfaces/service/users.service.interface';

import { UsersService } from './users.service';

const configServiceMock: IConfigService = { get: jest.fn() };
const usersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();

let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(TYPES.UsersService).to(UsersService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(configServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(usersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUsersService>(TYPES.UsersService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');

		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: UserEntity): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);

		createdUser = await usersService.createUser({
			email: 'ase@nma.ru',
			name: 'John',
			password: '1',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual(1);
	});

	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'ase@nma.ru',
			password: '1',
		});

		expect(result).toBeTruthy();
	});

	it('validateUser - wrongPassword', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'ase@nma.ru',
			password: '2',
		});

		expect(result).toBeFalsy();
	});

	it('validateUser - wrongUser', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const result = await usersService.validateUser({
			email: 'ase@nma.ru',
			password: '2',
		});

		expect(result).toBeFalsy();
	});
});
