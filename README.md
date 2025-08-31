Here is the updated README content including the new features and improvements you implemented in your Playwright TypeScript Automation Framework:

---

# Playwright TypeScript Automation Framework

A robust, scalable automation framework for modern web applications using [Playwright](https://playwright.dev/) with TypeScript. This framework demonstrates best practices including Page Object Model (POM), modular folder structure, easy configuration for cross-browser, parallel, screenshot capturing, enriched reporting, and CI-ready testing.

---

## 🚀 Features

- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **TypeScript** for strong typing and maintainability
- **Page Object Model (POM)** for organized, reusable code with a BasePage for common actions
- **Headless/Headed execution** modes
- **Parallel test execution** for faster runs
- **Test grouping** with `test.describe` for feature-wise organization
- **Tag-based filtering** for running Smoke or Regression suites
- **Automatic screenshots** captured on test failure (configurable to capture on all tests)
- **Rich HTML test reporting** with embedded screenshots and videos
- **Video recording and tracing** to aid debugging flaky tests
- **Test data reading and utility support**
- **Configurable browser management** via Playwright projects
- **Support for all types of web elements using Playwright selectors**

---

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- Node.js (v18+ recommended)
- Visual Studio Code or any IDE

---

## 📁 Project Structure

```
.
├── pages/               # POM classes, includes BasePage.ts and specific page classes
│   ├── BasePage.ts
│   └── DashboardPage.ts
├── tests/               # Test spec files organized and grouped via describe
│   └── dashboard.spec.ts
├── utils/               # Utilities (e.g., test data readers)
├── playwright.config.ts # Centralized Playwright config with projects, retries, screenshots, reporting
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npx playwright install
```

### 2. Run All Tests

```bash
npm run test
```

### 3. Run in Headed Mode (to see browser UI)

```bash
npm run test:headed
```

### 4. Run a Specific Test File

```bash
npx playwright test tests/dashboard.spec.ts
```

### 5. Run a Specific Test by Name

```bash
npx playwright test -g "has title"
```

### 6. Run Tests by Tag (e.g., Smoke Suite)

```bash
npx playwright test -g "@smoke"
```

---

## 🧩 Writing Tests

- Create spec files in `tests/` folder
- Use Page Object classes from `pages/` for clean, maintainable test logic
- Organize related tests using `test.describe` blocks to group by feature
- Example:

  ```typescript
  import { test } from "@playwright/test";
  import { DashboardPage } from "../pages/DashboardPage";

  test.describe("Dashboard Feature", () => {
    test("has title", async ({ page }) => {
      const dashboard = new DashboardPage(page);
      await dashboard.goto("https://playwright.dev/");
      await dashboard.assertTitleContains(/Playwright/);
    });

    test("get started link", async ({ page }) => {
      const dashboard = new DashboardPage(page);
      await dashboard.goto("https://playwright.dev/");
      await dashboard.clickGetStarted();
      await dashboard.expectInstallationHeadingVisible();
    });
  });
  ```

---

## ⚙️ Configuration

- `playwright.config.ts` manages test directory, retries, parallel runs, and cross-browser projects.
- Screenshots are automatically captured on test failure (configurable).
- Video recording and trace collection enabled for debugging flaky tests.
- You can define multiple projects to test different browsers and suites.

---

## 📊 View HTML Test Reports

After test execution, generate and open rich HTML reports with:

```bash
npx playwright test --reporter=html      
```

Reports show:

- Test summaries with passed/failed/skipped counts
- Embedded screenshots for failed tests
- Videos and trace files for deeper analysis

---

## 🔗 Additional Resources

- [Playwright Official Docs](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Playwright POM Guide](https://playwright.dev/docs/pom)
- [Playwright Test Tagging and Filtering](https://playwright.dev/docs/test-tags)

---

## 💡 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request for review

---

Happy Testing with Playwright and TypeScript! 🎉

---

If you want, I can help generate this as a formatted markdown file for direct GitHub use.

Sources
[1] Playwright: Fast and reliable end-to-end testing for modern web apps https://playwright.dev
