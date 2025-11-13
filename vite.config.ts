import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const API_BASE_URL = process.env.VITE_NODE_URI;

const APP_ROUTES =
  "api|shorten|geo-redirect|dashboard|login|register|src|assets|@vite|vite|auth|node_modules|app|@id|favicon.ico|__";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      [`^/((?!${APP_ROUTES}).+)$`]: {
        target: `${API_BASE_URL}/api`,
        changeOrigin: true,
      },
    },
  },
});
