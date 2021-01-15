import babel from '@babel/core';
import fs from 'fs';
import path from 'path';

const pluginBabel = () => ({
	name: 'babel',
	setup(build) {
		const options = babel.loadOptions();

		build.onLoad({ filter: /.*/ }, async args => {
			const source = await fs.promises.readFile(args.path, 'utf8');
			let contents;

			if (options.sourceMaps) {
				const filename = path.relative(process.cwd(), args.path);

				options.sourceFileName = filename;
			}

			babel.transform(source, options, (error, result) => {
				if (error) throw error;

				contents = result.code;
			});

			return { contents };
		});
	}
});

export default pluginBabel;
