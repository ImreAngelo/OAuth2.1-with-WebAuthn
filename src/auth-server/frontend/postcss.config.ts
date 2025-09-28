import type { Config } from 'postcss-load-config';

const config: Config = {
	plugins: {
		autoprefixer: {},
		// require('cssnano')({
        //     preset: 'default',
        // }),
	},
};

export default config;