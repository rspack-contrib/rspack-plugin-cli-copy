import type { Compiler, RspackPluginInstance } from '@rspack/core'
import WebpackDevServer from 'webpack-dev-server'
import clipboard from 'clipboardy'

export class cliCopyPlugin implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.afterCompile.tapAsync('NetworkCopyPlugin', async () => {
      const localIPv4 = (await WebpackDevServer.internalIP('v4')) || ''
      try {
        clipboard.writeSync(localIPv4)
        console.log(`\n  ${cyan('Copied to clipboard Network URL:')} ${localIPv4}`)
      } catch (error) {}
    })
  }
}

function cyan(str: string) {
  return `\x1b[36m${str}\x1b[0m`
}
