import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import svgLoader from 'vite-svg-loader'
import eslintPlugin from 'vite-plugin-eslint'
import { loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vuetify from 'vite-plugin-vuetify'

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [
      vue(),
      vuetify(),
      svgLoader(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      eslintPlugin(),
    ],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    preview: {
      port: 3000,
    },
    server: {
      port: 8080,
      hmr: {
        host: 'localhost',
      },
    },
    test: {
      // silent: true,
      globals: true,
      environment: 'jsdom',
      setupFiles: '/tests/setup-vitest.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        exclude: ['node_modules/', '/tests/setup-vitest.ts'],
      },
    },
  })
}
