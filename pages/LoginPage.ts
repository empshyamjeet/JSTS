import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { FrameworkConfig, UserCredentials } from '../config/environment';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page, app: FrameworkConfig) {
    super(page, app);
    this.usernameInput = page.locator('#email');
    this.passwordInput = page.locator('#passwd');
    this.loginButton = page.locator('#SubmitLogin');
  }

  async open() {
    await this.goto(this.app.urls.login);
  }

  async login(userName: string, password: string) {
    // Tests call this business action instead of filling fields directly.
    await this.clearAndType(this.usernameInput, userName);
    await this.clearAndType(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async loginWith(user: UserCredentials) {
    await this.login(user.username, user.password);
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/success/i);
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(new RegExp(this.app.urls.login));
  }

  async expectLoginFormVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
