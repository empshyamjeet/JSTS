import { expect, type Locator, type Page } from '@playwright/test';
import type { FrameworkConfig } from '../config/environment';
import type { AutomationPracticeFormData } from '../test-data/automationPractice';
import { BasePage } from './BasePage';

export class AutomationPracticePage extends BasePage {
  private readonly addressInput: Locator;
  private readonly bookTableRows: Locator;
  private readonly countryDropdown: Locator;
  private readonly dateInput: Locator;
  private readonly emailInput: Locator;
  private readonly femaleRadioButton: Locator;
  private readonly maleRadioButton: Locator;
  private readonly nameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly popupButton: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page, app: FrameworkConfig) {
    super(page, app);
    this.addressInput = page.locator('#textarea');
    this.bookTableRows = page.locator('table[name="BookTable"] tr');
    this.countryDropdown = page.locator('#country');
    this.dateInput = page.locator('#datepicker');
    this.emailInput = page.locator('#email');
    this.femaleRadioButton = page.locator('#female');
    this.maleRadioButton = page.locator('#male');
    this.nameInput = page.locator('#name');
    this.phoneInput = page.locator('#phone');
    this.popupButton = page.locator('button[onclick="myFunction()"]').first();
    this.submitButton = page.locator('.submit-btn');
  }

  async open() {
    await this.goto(this.app.urls.practice);
  }

  async fillForm(data: AutomationPracticeFormData) {
    // The form builder keeps example data in one place while the page object
    // owns the actual interaction details.
    await this.fill(this.nameInput, data.name);
    await this.fill(this.emailInput, data.email);
    await this.fill(this.phoneInput, data.phone);
    await this.fill(this.addressInput, data.address);
    await this.check(
      data.gender === 'male' ? this.maleRadioButton : this.femaleRadioButton,
    );
    await this.selectByLabel(this.countryDropdown, data.countryLabel);
  }

  async submitForm() {
    await this.click(this.submitButton);
  }

  async expectGenderSelection(gender: AutomationPracticeFormData['gender']) {
    const targetRadioButton =
      gender === 'male' ? this.maleRadioButton : this.femaleRadioButton;

    await expect(targetRadioButton).toBeChecked();
  }

  async openPopup() {
    return this.waitForPopup(() => this.click(this.popupButton));
  }

  async expectPopupDetails(popup: Page) {
    await expect(popup).toHaveURL('https://www.pavantestingtools.com/');
    await expect(popup.locator('h1.title')).toHaveText('SDET-QA Blog');
  }

  async setDate(date: string) {
    await this.fill(this.dateInput, date);
  }

  async expectDate(date: string) {
    await this.expectValue(this.dateInput, date);
  }

  async selectCountry(label: string) {
    await this.selectByLabel(this.countryDropdown, label);
  }

  async expectSelectedCountryValue(value: string) {
    await this.expectValue(this.countryDropdown, value);
  }

  async expectBookRecord(title: string, author: string, price: string) {
    const bookRow = this.bookTableRows.filter({ hasText: title });
    await expect(bookRow).toContainText(author);
    await expect(bookRow.locator('td').nth(3)).toHaveText(price);
  }
}
