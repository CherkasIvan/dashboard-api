import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/src'],
	testMatch: ['**/*.e2e.spec.ts'],
	moduleNameMapper: {
		'^@common/(.*)$': '<rootDir>/src/common/$1',
		'^@controller/(.*)$': '<rootDir>/src/controller/$1',
		'^@database/(.*)$': '<rootDir>/src/database/$1',
		'^@decorators/(.*)$': '<rootDir>/src/decorators/$1',
		'^@generated/(.*)$': '<rootDir>/src/generated/$1',
		'^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
		'^@metadata/(.*)$': '<rootDir>/src/metadata/$1',
		'^@middleware/(.*)$': '<rootDir>/src/common/middleware/$1',
		'^@service/(.*)$': '<rootDir>/src/service/$1',
		'^@typings/(.*)$': '<rootDir>/src/typings/$1',
		'^@guard/(.*)$': '<rootDir>/src/common/guard/$1',
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: { '^.+\\.tsx?$': 'ts-jest' },
	transformIgnorePatterns: [],
	testTimeout: 30000,
};

export default config;
