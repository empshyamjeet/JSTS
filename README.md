---
# Playwright TypeScript Automation Framework

A robust, scalable automation framework for modern web applications using [Playwright](https://playwright.dev/) with TypeScript. This framework demonstrates best practices such as the Page Object Model (POM), modular folder structure, configuration for cross-browser and parallel test execution, screenshot capturing, enriched reporting, and CI-ready setup.
---

## 🚀 Features

- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **Strong typing** and maintainability with TypeScript
- **Page Object Model (POM)** using a shared BasePage for reusable actions
- **Headless/Headed execution** support
- **Parallel test execution** for speed
- **Test grouping** with `test.describe`
- **Tag-based filtering** for running suites (e.g., Smoke/Regression)
- **Automatic screenshots** on failure (or for all tests, if configured)
- **Rich HTML test reporting** with embedded screenshots and videos
- **Video recording and tracing** for debugging
- **Data-driven test support** via JSON/TS/JS files
- **Flexible browser management** using Playwright projects
- **Comprehensive web element coverage using Playwright selectors**

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
├── pages/               # Page Object Model classes
│   ├── BasePage.ts
│   └── DashboardPage.ts
├── tests/               # Test specs (grouped with describe/feature)
│   └── dashboard.spec.ts
├── utils/               # Utility modules (e.g., test data files/readers)
├── playwright.config.ts # Playwright configuration
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

- Place spec files in `tests/`
- Use Page Object classes from `pages/` to keep tests concise and maintainable
- Use `test.describe` to group feature-related tests

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

- All global settings including folder structure, retries, parallelization, and browser projects are managed in `playwright.config.ts`.
- Screenshots and video capture are configured in the `use` section and reports are built automatically.

---

## 📊 View HTML Test Reports

After test execution, view your HTML report with:

```bash
npx playwright show-report
```

Your report includes summaries, screenshots of failures, and videos/traces for debugging.

---

## 🔗 Additional Resources

- [Playwright Official Docs](https://playwright.dev/docs/intro)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Playwright POM Guide](https://playwright.dev/docs/pom)
- [Test Tagging & Filtering](https://playwright.dev/docs/test-tags)

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
