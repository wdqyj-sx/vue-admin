import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite' // 不加这个配置，ElMessage出不来
import vitePluginImport from 'vite-plugin-babel-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers:[ElementPlusResolver({
        importStyle:'sass'
      })]
    }),
   ElementPlus()
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions:['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  base:'./',
  server: {
    proxy: {
      '/api':{
        target:'http://backend-api-02.newbee.ltd/manage-api/v1', 
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,'')
      }
    }
  },
  css: {
    preprocessorOptions:{
      //覆盖掉element-plus中主题变量文件
      scss: {
        additionalData:`@use "@/styles/element/index.scss" as *;`,
      }
    }
  }
})
