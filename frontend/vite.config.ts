import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "istanbul",
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTest.ts"],
  },
});
