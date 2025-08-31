// pages/DashboardPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly getStartedLink: Locator;
  readonly installationHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.installationHeading = page.getByRole('heading', { name: 'Installation' });
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  async expectInstallationHeadingVisible() {
    await expect(this.installationHeading).toBeVisible();
  }
}
