// config de Vitest (globals: true, jsdom, setupFiles)
// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // habilita test, expect, describe...
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
