import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test('has title', async ({ page }) => {
  const pwPage = new DashboardPage(page);
  await pwPage.goto();
  await pwPage.assertTitleContains(/Playwright/);
});

test('get started link', async ({ page }) => {
  const pwPage = new DashboardPage(page);
  await pwPage.goto();
  await pwPage.clickGetStarted();
  await pwPage.expectInstallationHeadingVisible();
});

// Other tests with duplicated steps similarly refactored:
test('has titless', async ({ page }) => {
  const pwPage = new DashboardPage(page);
  await pwPage.goto();
  await pwPage.assertTitleContains(/Playwright/);
});

test('get started sslink', async ({ page }) => {
  const pwPage = new DashboardPage(page);
  await pwPage.goto();
  await pwPage.clickGetStarted();
  await pwPage.expectInstallationHeadingVisible();
});
