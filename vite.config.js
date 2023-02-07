import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'

const serviceURI = 'http://localhost:8082/'
const serviceApiPrefix = '/api/v1'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 18090,
    strictPort: true,
    cors: true,
    proxy: {
      [serviceApiPrefix]: {
        target: serviceURI
        // rewrite: (p) => p.replace(/^\/api/, '')
      }
    }
    // 解决内网穿透一直重定向的问题
    // hmr: {
    //   protocol: 'ws',
    //   host: 'localhost'
    // }
  },
  build: {
    outDir: '../easynode-server/app/static',
    emptyOutDir: true
  },
  define: {
    'process.env': {
      serviceURI,
      serviceApiPrefix,
      clientPort: 22022
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            if (name.includes('el-')) name = name.replace('el-', '')
            return `element-plus/theme-chalk/src/${ name }.scss` // 按需引入样式
            // return `element-plus/theme-chalk/${ name }.css`
          }
        },
      ]
    }),
    viteCompression({
      algorithm: 'gzip',
      deleteOriginFile: false
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(
        './src',
        import.meta.url
      )),
      '@views': fileURLToPath(new URL(
        './src/views',
        import.meta.url
      )),
      '@utils': fileURLToPath(new URL(
        './src/utils',
        import.meta.url
      )),
      '@store': fileURLToPath(new URL(
        './src/store',
        import.meta.url
      ))
    }
  }
})
