import { injectable } from 'inversify';
import 'reflect-metadata';
import { type ILogObj, type ISettingsParam, Logger } from 'tslog';

import type { ILoggerService } from '../interfaces/service/logger.service.interface.js';

@injectable()
export class LoggerService implements ILoggerService {
	public logger!: Logger<ILogObj>;

	public constructor() {
		this.logger = new Logger({
			type: 'pretty',
			hideLogPositionForProduction: true,
			prettyLogTemplate: '{{dd}}.{{mm}}.{{yyyy}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}} ',
			prettyLogTimeZone: 'local',
			stylePrettyLogs: true,
		} as ISettingsParam<ILogObj>);
	}

	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
