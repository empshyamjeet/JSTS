import { test } from '../../fixtures/testFixtures';

test.describe('Playwright docs smoke @smoke', () => {
  test('should load the documentation landing page', async ({
    playwrightDocsPage,
  }) => {
    await playwrightDocsPage.open();
    await playwrightDocsPage.expectHomePageLoaded();
  });

  test('should open the getting started guide', async ({
    playwrightDocsPage,
  }) => {
    await playwrightDocsPage.open();
    await playwrightDocsPage.openGettingStarted();
    await playwrightDocsPage.expectGettingStartedPage();
  });
});
