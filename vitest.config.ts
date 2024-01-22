import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['test/vitest.setup.js', 'dotenv/config'],
  },
});
