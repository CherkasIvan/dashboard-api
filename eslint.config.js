import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import plugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['dist/', 'node_modules/'],
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: parser,
			ecmaVersion: 2022,
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': plugin,
		},
		rules: {
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'prettier/prettier': 'error',
		},
	},
	eslintPluginPrettierRecommended,
];
