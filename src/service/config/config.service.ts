import { type DotenvConfigOutput, type DotenvParseOutput, config } from 'dotenv';
import { inject, injectable } from 'inversify';

import { TYPES } from '@helpers/consts/types.const';
import type { IConfigService } from '@interfaces/service/config.service.interface';
import type { ILoggerService } from '@interfaces/service/logger.service.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config!: DotenvParseOutput;
	public constructor(@inject(TYPES.ILogger) private loggerService: ILoggerService) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.loggerService.error(
				'[ConfigService]: Не удалось прочитать .env или он отсутствует',
			);
		} else {
			this.loggerService.log('[ConfigService]: Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	public get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
