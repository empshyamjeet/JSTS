import { expect, type Locator, type Page } from '@playwright/test';
import type { FrameworkConfig } from '../config/environment';

export class BasePage {
  protected readonly page: Page;
  protected readonly app: FrameworkConfig;

  constructor(page: Page, app: FrameworkConfig) {
    this.page = page;
    this.app = app;
  }

  protected resolveLocator(locator: string | Locator): Locator {
    return typeof locator === 'string' ? this.page.locator(locator) : locator;
  }

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(locator: string | Locator) {
    const el = this.resolveLocator(locator);
    await el.waitFor({ state: 'visible', timeout: this.app.timeouts.expect });
    await el.click();
  }

  async fill(locator: string | Locator, text: string) {
    const el = this.resolveLocator(locator);
    await el.waitFor({ state: 'visible', timeout: this.app.timeouts.expect });
    await el.fill(text);
  }

  async clearAndType(locator: string | Locator, text: string) {
    const el = this.resolveLocator(locator);
    await el.waitFor({ state: 'visible', timeout: this.app.timeouts.expect });
    await el.clear();
    await el.fill(text);
  }

  async check(locator: string | Locator) {
    const el = this.resolveLocator(locator);
    await el.waitFor({ state: 'visible', timeout: this.app.timeouts.expect });
    await el.check();
  }

  async selectByLabel(locator: string | Locator, label: string) {
    const el = this.resolveLocator(locator);
    await el.waitFor({ state: 'visible', timeout: this.app.timeouts.expect });
    await el.selectOption({ label });
  }

  async expectVisible(locator: string | Locator) {
    await expect(this.resolveLocator(locator)).toBeVisible();
  }

  async expectValue(locator: string | Locator, value: string | RegExp) {
    await expect(this.resolveLocator(locator)).toHaveValue(value);
  }

  async expectChecked(locator: string | Locator) {
    await expect(this.resolveLocator(locator)).toBeChecked();
  }

  async expectUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }

  async expectTitle(text: string | RegExp) {
    await expect(this.page).toHaveTitle(text);
  }

  async waitForPopup(trigger: () => Promise<unknown>): Promise<Page> {
    // Popup handling is centralized here so tests do not need to manage
    // Promise.all boilerplate every time a new window opens.
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      trigger(),
    ]);

    await popup.waitForLoadState();
    return popup;
  }
}
