# esbuild-plugin-babel

[Babel](https://github.com/babel/babel) plugin for [esbuild](https://github.com/evanw/esbuild).

<br>

### Install

```zsh
npm install esbuild-plugin-babel --save-dev
```

<br>

### Use

`esbuild.config.js`

```js
import esbuild from 'esbuild';
import pluginBabel from 'esbuild-plugin-babel';

esbuild
	.build({
		entryPoints: ['index.js'],
		bundle: true,
		outfile: 'main.js',
		plugins: [pluginBabel()]
	})
	.catch(() => process.exit(1));
```

`package.json`

```json
{
    "type": "module",
    "scripts": {
        "start": "node esbuild.config.js"
    }
}
```

<br>

### Configure

`esbuild.config.js`

```js
pluginBabel({
    filter = /.*/,
    namespace = '',
    config = {} // babel config here or in babel.config.json
})
```

[`babel.config.json`](https://babeljs.io/docs/en/configuration)

```json
{
    "presets": [["@babel/preset-env", { "modules": false }]],
    "plugins": [...],
    "sourceMaps": "inline"
}
```

[`.browserslistrc`](https://github.com/browserslist/browserslist)

```yaml
defaults
```

<br>
