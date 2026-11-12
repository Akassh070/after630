import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    // A fake value so cloudinary-loader tests don't depend on (or leak) the
    // real account's cloud name.
    env: { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "test-cloud" },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
