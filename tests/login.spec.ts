// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../utils/testData.json';
import { users } from '../utils/users';


test('User can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto('https://demo.guru99.com/test/login.html');
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await loginPage.verifyLoginSuccess();
  await console.log('Login successful with valid credentials :'+users.validUser.username+" : "+users.validUser.password);
  

});

 