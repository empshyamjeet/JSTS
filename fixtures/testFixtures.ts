import { test as base, expect } from '@playwright/test';
import {
  getEnvironmentConfig,
  type FrameworkConfig,
} from '../config/environment';
import { AutomationPracticePage } from '../pages/AutomationPracticePage';
import { LoginPage } from '../pages/LoginPage';
import { PlaywrightDocsPage } from '../pages/PlaywrightDocsPage';

type FrameworkFixtures = {
  app: FrameworkConfig;
  automationPracticePage: AutomationPracticePage;
  loginPage: LoginPage;
  playwrightDocsPage: PlaywrightDocsPage;
};

export const test = base.extend<FrameworkFixtures>({
  // We create app config once per test so page objects always read the same
  // environment values for URLs, credentials, and timeouts.
  // eslint-disable-next-line no-empty-pattern
  app: async ({}, use) => {
    await use(getEnvironmentConfig());
  },

  automationPracticePage: async ({ page, app }, use) => {
    await use(new AutomationPracticePage(page, app));
  },

  loginPage: async ({ page, app }, use) => {
    await use(new LoginPage(page, app));
  },

  playwrightDocsPage: async ({ page, app }, use) => {
    await use(new PlaywrightDocsPage(page, app));
  },
});

export { expect };
