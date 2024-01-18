<h1 align="center">rspack-plugin-cli-copy</h1>
<p align="center">启动项目并自动复制终端的网络 URL</p>

<p align="center">
<a href="https://www.npmjs.com/package/rspack-plugin-cli-copy" target="__blank"><img src="https://img.shields.io/npm/v/rspack-plugin-cli-copy?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/rspack-plugin-cli-copy" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/rspack-plugin-cli-copy?color=50a36f&label="></a>
</p>

简体中文 | [English](./README.md)

![](./instructions/copy.jpg)

## 安装

```bash
npm install rspack-plugin-cli-copy -D
pnpm add rspack-plugin-cli-copy -D
```

## 用法

- rspack.config.js

```js
const { pluginCliCopy } = require('rspack-plugin-cli-copy')
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  plugins: [new cliCopyPlugin()]
}
```
