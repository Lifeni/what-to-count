import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const rendererPath = resolve(__dirname, './src/renderer')
const outDirRenderer = resolve(__dirname, './app/renderer')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: './',
  root: rendererPath,
  build: {
    outDir: outDirRenderer,
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: '@renderer',
        replacement: resolve(__dirname, 'src/renderer'),
      },
    ],
  },
})
