import { Clipboard } from '@napi-rs/clipboard'
import { type NetworkInterfaceInfo, networkInterfaces } from 'node:os'
import type { RspackPluginInstance, Compiler } from '@rspack/core'
import type { RsbuildPlugin } from '@rsbuild/core'

const clipboard = new Clipboard()

export class rspackCliCopyPlugin implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.afterCompile.tap('NetworkCopyPlugin', async () => {
      if (compiler.options.mode === 'development' && !compiler.modifiedFiles?.size) {
        const localIPv4 = getIpv4Interfaces()[0]
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
    const localIPv4 = getIpv4Interfaces()[0]
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

const getIpv4Interfaces = () => {
  const interfaces = networkInterfaces()
  const ipv4Interfaces: Map<string, NetworkInterfaceInfo> = new Map()
  for (const key of Object.keys(interfaces)) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    for (const detail of interfaces[key]!) {
      if (detail.internal) continue
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof detail.family === 'string' ? 'IPv4' : 4
      if (detail.family === familyV4Value && !ipv4Interfaces.has(detail.address)) {
        ipv4Interfaces.set(detail.address, detail)
      }
    }
  }
  return Array.from(ipv4Interfaces.keys())
}
