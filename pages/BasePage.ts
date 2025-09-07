import { expect, Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async click(locator: string | Locator) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.click();
  }

  async doubleClick(locator: string | Locator) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.dblclick();
  }

  async type(locator: string | Locator, text: string) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.fill(text);
  }

  async clearAndType(locator: string | Locator, text: string) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.fill('');
    await el.fill(text);
  }

  async isVisible(locator: string | Locator): Promise<boolean> {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await el.isVisible();
  }

  async isChecked(locator: string | Locator): Promise<boolean> {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await el.isChecked();
  }

  async setCheckbox(locator: string | Locator, shouldCheck = true) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    if (shouldCheck) {
      await el.check();
    } else {
      await el.uncheck();
    }
  }

  async selectDropdownByText(locator: string | Locator, text: string) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.selectOption({ label: text });
  }

  async selectDropdownByValue(locator: string | Locator, value: string) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.selectOption({ value });
  }

  async hover(locator: string | Locator) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.hover();
  }

  async scrollIntoView(locator: string | Locator) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.scrollIntoViewIfNeeded();
  }

  async getText(locator: string | Locator): Promise<string> {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.waitFor({ state: 'visible', timeout: 10000 });
    return await el.textContent() ?? '';
  }

  async assertTextContains(locator: string | Locator, text: string | RegExp) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(el).toContainText(text);
  }

  async assertVisible(locator: string | Locator) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(el).toBeVisible();
  }

  async assertTitleContains(text: string | RegExp) {
    await expect(this.page).toHaveTitle(text);
  }

  async refresh() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async getAttribute(locator: string | Locator, attr: string): Promise<string | null> {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await el.getAttribute(attr);
  }

  async uploadFile(locator: string | Locator, filePath: string) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.setInputFiles(filePath);
  }

  async waitForHidden(locator: string | Locator) {
    const el = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await el.waitFor({ state: 'hidden', timeout: 10000 });
  }
}
