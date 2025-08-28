
# Playwright TypeScript Automation Framework

A robust, scalable automation framework for modern web applications using [Playwright](https://playwright.dev/) with TypeScript. This framework demonstrates best practices including Page Object Model (POM), modular folder structure, and easy configuration for cross-browser, parallel, and CI-ready testing.

***

## 🚀 Features

- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **TypeScript** for strong typing and maintainability
- **Page Object Model (POM)** for organized, reusable code
- **Headless/Headed execution** modes
- **Parallel test execution** by default
- **Rich HTML test reporting**
- **Easy configuration and scaling**
- **Ready for CI/CD integration**

***

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- Node.js (v18+ recommended)
- Visual Studio Code or any IDE

***

## 📁 Project Structure

```
.
├── pages/            # POM classes for each page/component
│   ├── BasePage.ts
│   └── DashboardPage.ts
├── tests/            # Test spec files
│   └── dashboard.spec.ts
├── utils/            # Utilities (optional, e.g., test data)
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

***

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

### 3. Run in Headed mode (see browser UI)

```bash
npm run test:headed
```

### 4. Run a Specific Test File

```bash
npx playwright test tests/dashboard.spec.ts
```

### 5. Run a Specific Test by Title

```bash
npx playwright test -g "Your Test Title"
```

***

## 🧩 Writing Tests

- Create spec files in `tests/`
- Use page objects (from `pages/`) for clean and maintainable tests
- Example usage:
    ```typescript
    import { test } from '@playwright/test';
    import { DashboardPage } from '../pages/DashboardPage';
    test('verify title', async ({ page }) => {
      const dashboard = new DashboardPage(page);
      await dashboard.goto('https://playwright.dev/');
      await dashboard.assertTitleContains(/Playwright/);
    });
    ```

***

## ⚙️ Configuration

Periodic settings (parallel runs, retries, reporting) can be changed in `playwright.config.ts`.

***

## 📊 View HTML Test Reports

After running tests, open the HTML report with:

```bash
npx playwright show-report
```

***

## 🔗 Resources

- [Playwright Docs](https://playwright.dev/docs/intro)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Playwright Page Object Model Guide](https://playwright.dev/docs/pom)

***

## 💡 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

***


