import { inject, injectable } from 'inversify';

import type { UsersLoginDto } from '@controller/dto/users-login.dto';
import type { UsersRegisterDto } from '@controller/dto/users-register.dto';
import { UserEntity } from '@controller/entity/user.entity';
import type { UserModel } from '@generated/prisma/index';
import { TYPES } from '@helpers/consts/types.const';
import type { IUsersRepository } from '@interfaces/repository/users.repository.interface';
import type { IConfigService } from '@interfaces/service/config.service.interface';
import type { IUsersService } from '@interfaces/service/users.service.interface';

@injectable()
export class UsersService implements IUsersService {
	public constructor(
		@inject(TYPES.ConfigService)
		private configService: IConfigService,
		@inject(TYPES.UsersRepository)
		private usersRepository: IUsersRepository,
	) {}

	public async createUser({
		email,
		name,
		password,
	}: UsersRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get<number>('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	public async validateUser({ email, password }: UsersLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		} else {
			const newUser = new UserEntity(
				existedUser?.email,
				existedUser?.name,
				existedUser?.password,
			);
			return newUser.comparePassword(password);
		}
	}

	public async getUserInfo(email: string): Promise<UserModel | null> {
		return await this.usersRepository.find(email);
	}
}
