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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js',
        entryFileNames: `static/js/2025/12/15/[name].[hash].js`,
        chunkFileNames: `static/js/2025/12/15/[name].[hash].js`,
        // ✅ 修复这里：增加 undefined 安全判断
        assetFileNames: (assetInfo) => {
          // 安全兜底：name 不存在时赋值为空字符串
          const fileName = assetInfo.name || '';

          // 检查css文件
          if (fileName.endsWith('.css')) {
            return 'static/css/2025/12/15/[name].[hash].css';
          }

          // 检查图片文件
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico'];
          if (imageExtensions.some(ext => fileName.endsWith(ext))) {
            return 'static/images/2025/12/15/[name].[hash][ext]';
          }

          // 默认路径
          return 'assets/[name].[hash][ext]';
        }
      }
    },
    cssCodeSplit: false,
    assetsDir: ''
  }
})