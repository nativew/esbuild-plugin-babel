import babel from '@babel/core';
import fs from 'fs';
import path from 'path';

const pluginBabel = (options = {}) => ({
	name: 'babel',
	async setup(build, { transform } = {}) {
		const { filter = /.*/, namespace = '', config = {} } = options;

		const transformContents = ({ args, contents }) => {
			const babelOptions = babel.loadOptions({ filename: args.path, ...config });

			if (babelOptions.sourceMaps) {
				const filename = path.relative(process.cwd(), args.path);

				babelOptions.sourceFileName = filename;
			}

			return new Promise((resolve, reject) => {
				babel.transform(contents, babelOptions, (error, result) => {
					error ? reject(error) : resolve({ contents: result.code });
				});
			});
		};

		if (transform) return await transformContents(transform);

		build.onLoad({ filter, namespace }, async args => {
			const contents = await fs.promises.readFile(args.path, 'utf8');

			return await transformContents({ args, contents });
		});
	}
});

export default pluginBabel;
