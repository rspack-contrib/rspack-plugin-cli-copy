import type { RspackPluginInstance, Compiler } from '@rspack/core'
import WebpackDevServer from 'webpack-dev-server'
import { Clipboard } from '@napi-rs/clipboard'
import type { RsbuildPlugin } from '@rsbuild/core'

const clipboard = new Clipboard()

export class rspackCliCopyPlugin implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.afterCompile.tap('NetworkCopyPlugin', async () => {
      if (compiler.options.mode === 'development' && !compiler.modifiedFiles?.size) {
        const localIPv4 = (await WebpackDevServer.internalIP('v4')) || ''
        const port = compiler.options.devServer?.port
        const v = `http://${localIPv4}:${port}`
        print(v)
      }
    })
  }
}

export const rsbuildCliCopyPlugin = (): RsbuildPlugin => ({
  name: 'rsbuildCliCopyPlugin',
  async setup(api) {
    const localIPv4 = (await WebpackDevServer.internalIP('v4')) || ''
    api.onAfterStartDevServer(server => {
      const v = `http://${localIPv4}:${server.port}`
      print(v)
    })
  }
})

function print(v: string) {
  try {
    clipboard.setText(v)
    console.log(`\n  ${cyan('Copied to clipboard Network URL:')} ${v} \n`)
  } catch (error) {
    console.error(`\n  ${red('Failed to copy to clipboard Network URL:')} ${JSON.stringify(error)} \n`)
  }
}

function cyan(str: string) {
  return `\x1b[36m${str}\x1b[0m`
}

function red(str: string) {
  return `\x1b[31m${str}\x1b[0m`
}
