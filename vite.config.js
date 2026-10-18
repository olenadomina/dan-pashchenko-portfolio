import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  build: {
    rollupOptions: {
      input: {
        portfolio: fileURLToPath(new URL('./index.html', import.meta.url)),
        macos: fileURLToPath(new URL('./macos/index.html', import.meta.url)),
      },
      output: { manualChunks: { three: ['three'] } },
    },
  },
});
