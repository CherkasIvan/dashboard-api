import { compare, hash } from 'bcryptjs';

export class UserEntity {
	private _password!: string;

	public constructor(
		private readonly _email: string,
		private readonly _name: string,
		private readonly _passwordHash?: string,
	) {
		if (_passwordHash) {
			this._password = _passwordHash;
		}
	}

	public get email(): string {
		return this._email;
	}

	public get name(): string {
		return this._name;
	}

	public get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}
