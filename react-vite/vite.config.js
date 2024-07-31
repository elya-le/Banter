import { defineConfig, loadEnv } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // This will load the environment variables without assigning to a variable.
  loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      eslintPlugin({
        lintOnStart: true,
        failOnError: mode === 'production',
      }),
    ],
    server: {
      open: true,
      proxy: {
        '/api': 'http://127.0.0.1:5000',
      },
    },
  };
});