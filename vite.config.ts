import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@recoil', replacement: '/src/recoil' },
      { find: '@zustand', replacement: '/src/zustand' },
      { find: '@api', replacement: '/src/api' },
      // 미작성시 컴파일 에러
      { find: '@utils', replacement: '/src/utils' },
      { find: '#types', replacement: '/src/types' },
    ],
  },
});
