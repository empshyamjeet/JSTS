# Client-Ready Playwright Framework

This repository is a clean Playwright + TypeScript starter framework that you can use for client delivery, onboarding, and KT. It keeps the current public demo coverage, but the project structure, fixtures, configuration, reporting, and documentation now follow a reusable framework pattern instead of a single-purpose demo suite.

## What is included

- Environment-aware configuration with `.env` layering
- Reusable fixtures for shared page objects
- Page object model for each sample application
- Typed test-data builders
- Smoke and regression test grouping with tags
- HTML and JUnit reporting
- Type checking, linting, and formatting scripts
- GitHub Actions CI starter workflow
- Client KT guide for onboarding and handoff

## Project structure

```text
.
├── .github/workflows/          # CI pipeline
├── config/                     # Environment and framework config
├── docs/                       # KT and handoff material
├── fixtures/                   # Shared Playwright fixtures
├── pages/                      # Page objects
├── test-data/                  # Typed test data and builders
├── tests/
│   ├── e2e/                    # Functional regression flows
│   └── smoke/                  # Quick confidence checks
├── playwright.config.ts        # Playwright runner configuration
├── package.json                # Scripts and dependencies
└── tsconfig.json               # TypeScript configuration
```

## Quick start

1. Install dependencies.

```bash
npm install
```

2. Install the required Playwright browsers.

```bash
npx playwright install chromium
```

3. Copy environment defaults when you need local overrides.

```bash
cp .env.example .env.local
```

4. Run the test suite.

```bash
npm test
```

## Scripts

- `npm test` runs the full suite.
- `npm run test:smoke` runs tests tagged with `@smoke`.
- `npm run test:regression` runs tests tagged with `@regression`.
- `npm run test:headed` opens the browser UI during execution.
- `npm run test:list` lists the discovered test cases.
- `npm run typecheck` validates all TypeScript sources.
- `npm run lint` runs ESLint.
- `npm run format` checks formatting.
- `npm run format:write` writes formatting fixes.

## Environment model

The framework reads configuration in this order:

1. `.env`
2. `.env.<TEST_ENV>`
3. `.env.local`
4. process environment variables

Supported sample environments are `qa`, `uat`, and `prod`. Use `TEST_ENV=uat npm test` when you want to switch profiles.

## Test design rules

- Keep selectors inside page objects.
- Keep test data in `test-data/`.
- Use fixtures from `fixtures/testFixtures.ts`.
- Prefer stable Playwright locators and assertion-based waits.
- Tag tests using `@smoke` and `@regression`.

## KT docs

The client handoff material lives in [docs/CLIENT_KT.md](/Volumes/private/JSTS/docs/CLIENT_KT.md).
