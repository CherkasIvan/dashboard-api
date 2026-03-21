import { type ILogObj, type ISettingsParam, Logger } from 'tslog';

import { LoggerDecorator } from '../decorators/logger.decorator.js';
import { Prop } from '../decorators/property.decorator.js';
import type { ILogger } from '../interfaces/logger.interface.js';
import { Meta } from '../metadata/metadata.js';

@Meta
@LoggerDecorator()
export class LoggerService implements ILogger {
    @Prop()
    public logger!: Logger<ILogObj>;

    public constructor() {
        this.logger = new Logger({
            type: 'pretty',
            hideLogPositionForProduction: true,
            prettyLogTemplate:
                '{{dd}}.{{mm}}.{{yyyy}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}} ',
            prettyLogTimeZone: 'local',
            stylePrettyLogs: true,
        } as ISettingsParam<ILogObj>);
    }

    public log(...args: unknown[]) {
        this.logger.info(...args);
    }

    public error(...args: unknown[]) {
        this.logger.error(...args);
    }

    public warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}
