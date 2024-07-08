import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { rsbuildCliCopyPlugin } from 'rspack-plugin-cli-copy'

export default defineConfig({
  plugins: [pluginVue(), rsbuildCliCopyPlugin()]
})
