import { defineConfig } from 'vitest/config';
import path from 'path';
 
export default defineConfig({
test: {
environment: 'jsdom',
setupFiles: ['./vitest.setup.ts'],
include: ['src/**/*.{test,spec}.{ts,tsx}'],
globals: true,
css: true,
},
resolve: {
alias: {
'@': path.resolve(__dirname, './src'),
},
},
});