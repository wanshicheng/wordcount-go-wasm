import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 配置静态资源基础路径
  // Configure base path for static resources
  base: './',
  
  // 配置服务器选项
  // Configure server options
  server: {
    // 配置WebAssembly MIME类型
    // Configure WebAssembly MIME type
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  
  // 构建选项
  // Build options
  build: {
    // 输出目录
    // Output directory
    outDir: 'dist',
    
    // 配置资源处理
    // Configure asset handling
    assetsInlineLimit: 0, // 禁用小文件内联，确保wasm文件作为单独的文件
    
    // 配置Rollup打包选项
    // Configure Rollup bundling options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  
  // 优化依赖
  // Optimize dependencies
  optimizeDeps: {
    // 排除WebAssembly文件
    // Exclude WebAssembly files
    exclude: ['**/wordcount.wasm']
  },
  
  // 配置解析选项
  // Configure resolve options
  resolve: {
    // 配置别名
    // Configure aliases
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});