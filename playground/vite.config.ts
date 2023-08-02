import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginDevMock from '../src/index.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePluginDevMock({ entry: 'playground/mock/index.js' })
  ],
})
