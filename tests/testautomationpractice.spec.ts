import { test, expect } from "@playwright/test";

test.describe("Automation Practice End-to-End", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
  });

  test("should fill and submit the form", async ({ page }) => {
    await page.fill("#name", "Test User");
    await page.fill("#email", "testuser@email.com");
    await page.fill("#phone", "9876543210");
    await page.fill("#textarea", "Address - 9876543210");
    await page.check("#male");
    await page.waitForTimeout(2000); // Just to simulate user pause
    var isChecked = await page.locator("#male").isChecked();
    console.log(isChecked);
    isChecked = await page.locator("#female").isChecked();
    console.log(isChecked);
    await page.waitForTimeout(2000); // Just to simulate user pause
    await page.check("#female");
    await page.selectOption("#country", "India");
    await page.click(".submit-btn");
    //await expect(page.locator('#status')).toContainText(/Submitted/);
  });

  test("should interact with buttons/links and verify new tab", async ({
    page,
    context,
  }) => {
    // Click button that opens new tab
    await page.click('button[onclick="myFunction()"]');

    // Wait for new page (tab) to open
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      // The click already happened above, so no need to click here again
    ]);

    // Wait for the new tab to load content
    await newPage.waitForLoadState();

    // Verify URL of new tab
    await expect(newPage).toHaveURL("https://www.pavantestingtools.com/");

    // Verify the <h1 class="title"> text content on new tab
    await expect(newPage.locator("h1.title")).toHaveText("SDET-QA Blog");
    newPage.close();
    await page.bringToFront();
    await page.click('button[onclick="myFunction()"]');
  });

  test("should work with date picker", async ({ page }) => {
    await page.fill("#datepicker", "09/15/2025");
    const dateValue = await page.inputValue("#datepicker");
    console.log(`Date entered: ${dateValue}`);
    await expect(page.locator("#datepicker")).toHaveValue("09/15/2025");
  });

  test("should select from dropdown", async ({ page }) => {
    await page.selectOption("#country", { label: "India" });
    await expect(page.locator("#country")).toHaveValue("India");
  });

  test("should validate book table contains Selenium book", async ({
    page,
  }) => {
    const bookRow = page
      .locator('table[name="BookTable"] tr')
      .filter({ hasText: "Learn Selenium" });
    await expect(bookRow).toContainText("Amit");
    await expect(bookRow.locator("td")).nth(3).toHaveText("300"); // Price cell
  });

  test("should handle JavaScript alert", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("This is an alert box!");
      await dialog.accept();
    });
    await page.click('button[onclick="myFunction()"]');
    // Validate post-alert effect here
  });

  // Add more tests for frames, images, drag/drop etc. if present

  test("should take screenshot after actions", async ({ page }) => {
    await page.screenshot({ path: "practice-page.png" });
    await expect(page).toHaveScreenshot();
  });
});
