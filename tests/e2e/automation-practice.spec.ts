import { test } from '../../fixtures/testFixtures';
import {
  buildAutomationPracticeFormData,
  seleniumBookExpectation,
} from '../../test-data/automationPractice';

test.describe('Automation practice flows @regression', () => {
  test.beforeEach(async ({ automationPracticePage }) => {
    await automationPracticePage.open();
  });

  test('should complete the sample form @smoke', async ({
    automationPracticePage,
  }) => {
    const formData = buildAutomationPracticeFormData();

    await automationPracticePage.fillForm(formData);
    await automationPracticePage.expectGenderSelection(formData.gender);
    await automationPracticePage.expectSelectedCountryValue(
      formData.countryValue,
    );
    await automationPracticePage.submitForm();
  });

  test('should open the external popup page', async ({
    automationPracticePage,
  }) => {
    const popup = await automationPracticePage.openPopup();
    await automationPracticePage.expectPopupDetails(popup);
    await popup.close();
  });

  test('should update the date picker value', async ({
    automationPracticePage,
  }) => {
    const formData = buildAutomationPracticeFormData();

    await automationPracticePage.setDate(formData.date);
    await automationPracticePage.expectDate(formData.date);
  });

  test('should select a country by label', async ({
    automationPracticePage,
  }) => {
    const formData = buildAutomationPracticeFormData();

    await automationPracticePage.selectCountry(formData.countryLabel);
    await automationPracticePage.expectSelectedCountryValue(
      formData.countryValue,
    );
  });

  test('should verify the Selenium book row', async ({
    automationPracticePage,
  }) => {
    await automationPracticePage.expectBookRecord(
      seleniumBookExpectation.title,
      seleniumBookExpectation.author,
      seleniumBookExpectation.price,
    );
  });
});
