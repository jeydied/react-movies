import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      store: "/src/store",
      constants: "/src/constants",
      types: "/src/types",
      hooks: "/src/hooks",
      services: "/src/services",
      lib: "/src/lib",
    },
  },
});
