import { IsEmail, IsString } from 'class-validator';

export class UsersLoginDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email!: string;

	@IsString({ message: 'Неверно указан пароль' })
	password!: string;
}
