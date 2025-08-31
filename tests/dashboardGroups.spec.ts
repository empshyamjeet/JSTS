// tests/dashboard.spec.ts
import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Dashboard Feature', () => {

  test('has title', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto('https://playwright.dev/');
    await dashboard.assertTitleContains(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto('https://playwright.dev/');
    await dashboard.clickGetStarted();
    await dashboard.expectInstallationHeadingVisible();
  });
  
});
