import type { UserEntity } from '@controller/entity/user.entity';
import type { UserModel } from '@generated/prisma/index';

export interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
