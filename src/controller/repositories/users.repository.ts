import { inject, injectable } from 'inversify';

import type { PrismaService } from '@database/prisma.service';
import type { UserModel } from '@generated/prisma/index';
import { TYPES } from '@helpers/consts/types.const';
import type { IUsersRepository } from '@interfaces/repository/users.repository.interface';

import type { UserEntity } from '../entity/user.entity';

@injectable()
export class UsersRepository implements IUsersRepository {
	public constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	public async create({ email, password, name }: UserEntity): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	public async find(email: string): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
