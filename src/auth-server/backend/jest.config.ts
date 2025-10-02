import type { Config } from 'jest';

const config: Config = {
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},
	// transform: {
	// 	'^.+\\.(ts|tsx)$': 'ts-jest',
	// },
	testEnvironment: 'node',
	extensionsToTreatAsEsm: ['.ts'],
};

export default config;
