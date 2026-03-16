import { defineConfig, devices } from '@playwright/test';
import { getEnvironmentConfig } from './config/environment';

const app = getEnvironmentConfig();

const workers = Number(process.env.WORKERS ?? (process.env.CI ? 2 : 1));
const retries = Number(process.env.RETRIES ?? (process.env.CI ? 1 : 0));

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries,
  workers,
  timeout: app.timeouts.test,
  expect: {
    timeout: app.timeouts.expect,
  },
  outputDir: 'test-results/artifacts',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/html' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
  ],
  use: {
    headless: app.browser.headless,
    actionTimeout: app.timeouts.action,
    navigationTimeout: app.timeouts.navigation,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    testIdAttribute: 'data-testid',
    viewport: { width: 1440, height: 900 },
    launchOptions: {
      slowMo: app.browser.slowMo,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
