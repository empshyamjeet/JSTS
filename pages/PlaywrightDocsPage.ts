import { type Locator, type Page } from '@playwright/test';
import type { FrameworkConfig } from '../config/environment';
import { BasePage } from './BasePage';

export class PlaywrightDocsPage extends BasePage {
  private readonly getStartedLink: Locator;
  private readonly installationHeading: Locator;

  constructor(page: Page, app: FrameworkConfig) {
    super(page, app);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.installationHeading = page.getByRole('heading', {
      name: 'Installation',
    });
  }

  async open() {
    await this.goto(this.app.urls.docs);
  }

  async expectHomePageLoaded() {
    await this.expectTitle(/Playwright/);
  }

  async openGettingStarted() {
    // This small flow acts as a simple smoke example for new contributors.
    await this.click(this.getStartedLink);
  }

  async expectGettingStartedPage() {
    await this.expectUrl(/docs\/intro/);
    await this.expectVisible(this.installationHeading);
  }
}
