<h1 align="center">rspack-plugin-cli-copy</h1>
<p align="center">Start the project and automatically copy the network URL of the terminal</p>

<p align="center">
<a href="https://www.npmjs.com/package/rspack-plugin-cli-copy" target="__blank"><img src="https://img.shields.io/npm/v/rspack-plugin-cli-copy?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/rspack-plugin-cli-copy" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/rspack-plugin-cli-copy?color=50a36f&label="></a>
</p>

English | [简体中文](./README.zh_CN.md)

![](./instructions/copy.jpg)

## Install

```bash
npm install rspack-plugin-cli-copy -D

pnpm add rspack-plugin-cli-copy -D
```

## Usage

### rspack config

- rspack.config.ts

```js
import { defineConfig } from '@rspack/cli'
import { rspackCliCopyPlugin } from 'rspack-plugin-cli-copy'

export default defineConfig({
  plugins: [new rspackCliCopyPlugin()]
})
```

![](./instructions/rspack.png)

### rsbuild config

- rsbuild.config.ts

```ts
import { defineConfig } from '@rsbuild/core'
import { rsbuildCliCopyPlugin } from 'rspack-plugin-cli-copy'

export default defineConfig({
  plugins: [rsbuildCliCopyPlugin()]
})
```

![](./instructions/rsbuild.png)
