import { defineConfig, devices } from "@playwright/test";

const LOCAL = process.env.LOCAL_BASE_URL ?? "http://localhost:3000";
const REF = process.env.REF_BASE_URL ?? "https://navigate-potential-356153.framer.app";

export default defineConfig({
  testDir: "./tests",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "docs/playwright-report" }]],
  use: {
    trace: "on-first-retry",
    screenshot: "off",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Prefer installed Chrome when sandbox blocks bundled headless shell
        channel: process.env.PW_CHANNEL ?? "chrome",
      },
    },
  ],
  metadata: { LOCAL, REF },
});

export { LOCAL, REF };
