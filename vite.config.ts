/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { createHtmlPlugin } from 'vite-plugin-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Template',
        }
      }
    })
  ],
  resolve: {
    alias: [ 
      { 
        find: '@', 
        replacement: path.resolve(__dirname, 'src') 
      }
    ],
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  base: '/',
  css: { transformer: 'lightningcss' },
  build: { 
    chunkSizeWarningLimit: 1000,
    cssMinify: 'lightningcss',
  },
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
