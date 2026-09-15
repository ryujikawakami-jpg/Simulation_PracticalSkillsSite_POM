import { defineConfig } from '@playwright/test';

export default defineConfig({
  // 既定は練習問題。模範解答を動かすときは TEST_DIR=answers（npm run test:answers）
  testDir: process.env.TEST_DIR || './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: process.env.BASE_URL || 'https://bookshelf-practice-site.web.app',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
