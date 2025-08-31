// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('https://demo.guru99.com/test/login.html');
  await loginPage.login('testuser', 'password123');
  await loginPage.verifyLoginSuccess();

});

 