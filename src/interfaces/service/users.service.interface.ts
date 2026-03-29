import type { UsersLoginDto } from '../../controller/dto/users-login.dto';
import type { UsersRegisterDto } from '../../controller/dto/users-register.dto';
import type { UserModel } from '../../generated/prisma/index';

export interface IUsersService {
	createUser: (dto: UsersRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UsersLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}
