import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    cors: true
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    minify: 'terser', // ✅ 开启内置 terser
    terserOptions: {  // ✅ 压缩配置
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js', // 将所有JavaScript合并到一个文件
        // plugins: [terser()], 该行已经删掉，因为terserOptions已经包含了压缩配置
        entryFileNames: `static/js/2025/12/15/[name].[hash].js`,
        chunkFileNames: `static/js/2025/12/15/[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name;

          //检查css文件
          if (fileName.endsWith('.css')) {
            return 'static/css/2025/12/15/[name].[hash].css';
          }

          //检查图片文件
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico'];
          if (imageExtensions.some(ext => fileName.endsWith(ext))) {
            return 'static/images/2025/12/15/[name].[hash][ext]';
          }

          //默认路径
          return 'assets/[name].[hash][ext]';
        }
      }
    },
    cssCodeSplit: false,  //确保css文件不被拆分
    assetsDir: ''         //空表示不使用额外目录
  }
})