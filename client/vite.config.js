import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true, // Ensures CORS works
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite if necessary
      },
    },
  },
  resolve: {
    alias: {
      "/vite.svg": path.resolve(__dirname, "./src/assets/vite.svg"), // Correctly resolve path using path.resolve
    },
  },
});
