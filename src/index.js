import babel from '@babel/core';
import fs from 'fs';
import path from 'path';

const pluginBabel = (options = {}) => ({
	name: 'babel',
	setup(build, transform) {
		const { filter = /.*/, namespace = '', config = {} } = options;

		const transformContents = ({ args, contents }) => {
			options = babel.loadOptions(config);

			if (options.sourceMaps) {
				const filename = path.relative(process.cwd(), args.path);

				options.sourceFileName = filename;
			}

			babel.transform(contents, options, (error, result) => {
				if (error) throw error;

				contents = result.code;
			});

			return { contents };
		};

		if (transform) return transformContents(transform);

		build.onLoad({ filter, namespace }, async args => {
			const contents = await fs.promises.readFile(args.path, 'utf8');

			return transformContents({ args, contents });
		});
	}
});

export default pluginBabel;
