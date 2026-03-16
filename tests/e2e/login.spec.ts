import { test } from '../../fixtures/testFixtures';

test.describe('Login flow @smoke @regression', () => {
  test('should login with the configured valid user', async ({
    app,
    loginPage,
  }) => {
    await test.step('Open the login page', async () => {
      await loginPage.open();
      await loginPage.expectOnLoginPage();
    });

    await test.step('Submit valid credentials', async () => {
      await loginPage.loginWith(app.credentials.validUser);
    });

    await test.step('Verify successful navigation', async () => {
      await loginPage.expectLoginSuccess();
    });
  });

  test('should display the login form controls', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoginFormVisible();
  });
});
