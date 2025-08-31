// pages/LoginPage.ts
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = '#email';
  private passwordInput = '#passwd';
  private loginBtn = '#SubmitLogin';

  async login(username: string, password: string) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginBtn);
  }

  async verifyLoginSuccess() {
    // Add your verification logic after login, e.g., checking URL or UI element
    expect(await this.page.url()).toContain('success222');
  }
}
