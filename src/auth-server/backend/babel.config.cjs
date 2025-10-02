// Use babel for unit testing with babel-jest
module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		['@babel/preset-typescript'],
	],
};
