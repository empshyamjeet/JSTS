import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return this.page.title();
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async type(locator: string, text: string) {
    await this.page.locator(locator).fill(text);
  }

  async isVisible(locator: string) {
    return this.page.locator(locator).isVisible();
  }
}
