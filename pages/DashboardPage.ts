import { expect, Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly installationHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.installationHeading = page.getByRole('heading', { name: 'Installation' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async assertTitleContains(text: string | RegExp) {
    await expect(this.page).toHaveTitle(text);
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  async expectInstallationHeadingVisible() {
    await expect(this.installationHeading).toBeVisible();
  }
}
