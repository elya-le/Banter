// vite.config.js
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  server: {
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:5001",  // keep existing proxy settings
    },
  },
  build: {
    rollupOptions: {
      external: ['socket.io-client'], // add this line to externalize socket.io-client
    },
  },
}));
