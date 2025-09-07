import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = '#email';
  private passwordInput = '#passwd';
  private loginBtn = '#SubmitLogin';

  async login(username: string, password: string) {
    console.log(`Logging in with username: ${username}`);
    await this.clearAndType(this.usernameInput, username);
    await this.clearAndType(this.passwordInput, password);
    await this.click(this.loginBtn);
  }

  async verifyLoginSuccess() {
    // Sample: check for a successful URL or element visible
    await expect(this.page).toHaveURL(/success/i);
    // Optionally: await this.assertVisible('selector-for-success-element');
  }
}
