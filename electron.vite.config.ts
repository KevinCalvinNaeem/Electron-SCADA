import { defineConfig } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: {
      lib: { entry: resolve(__dirname, 'electron/main.ts') },
    },
  },
  preload: {
    build: {
      lib: { entry: resolve(__dirname, 'electron/preload.ts') },
    },
  },
  renderer: {
    root: __dirname,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 👈 add this
      },
    },
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
      },
    },
  },
})

