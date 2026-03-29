import { inject, injectable } from 'inversify';

import { TYPES } from '@helpers/consts/types.const';
import type { ILoggerService } from '@interfaces/service/logger.service.interface';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaService {
	public client: PrismaClient;

	public constructor(@inject(TYPES.ILogger) private loggerService: ILoggerService) {
		const url = process.env.DATABASE_URL;
		if (!url) {
			throw new Error('DATABASE_URL is not defined in environment');
		}

		const adapter = new PrismaLibSql({ url });
		this.client = new PrismaClient({ adapter });
	}

	public async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.loggerService.log('[PrismaService]: Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.loggerService.error(
					'[PrismaService]: Ошибка подключения к базе данных ' + e.message,
				);
			}
		}
	}

	public async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
