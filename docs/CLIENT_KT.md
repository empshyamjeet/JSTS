# Client KT Guide

## Purpose

This guide is for onboarding a client or internal QA team onto the framework with minimal tribal knowledge.

## Architecture summary

- `config/environment.ts`
  Loads environment-specific URLs, credentials, timeouts, and browser settings.
- `fixtures/testFixtures.ts`
  Provides shared framework fixtures and page objects.
- `pages/`
  Stores page objects only. Tests should not keep raw selectors.
- `test-data/`
  Stores typed sample data and builder functions.
- `tests/smoke/`
  Fast confidence checks for core paths.
- `tests/e2e/`
  Functional flows and regression coverage.

## How to add a new test

1. Add or update a page object in `pages/`.
2. Add sample test data in `test-data/` if the flow needs reusable inputs.
3. Expose the page object through `fixtures/testFixtures.ts` if it should be shared broadly.
4. Create the spec in `tests/smoke/` or `tests/e2e/`.
5. Tag the scenario in the title using `@smoke` or `@regression`.
6. Run `npm run typecheck` and `npm test`.

## How to add a new environment

1. Create a new `.env.<name>` file.
2. Add URLs, credentials, and timeouts for that environment.
3. Run with `TEST_ENV=<name> npm test`.
4. If the environment needs browser or worker overrides, use runtime env vars such as `HEADLESS`, `WORKERS`, and `RETRIES`.

## Execution guide

- Full suite: `npm test`
- Smoke suite: `npm run test:smoke`
- Regression suite: `npm run test:regression`
- Headed mode: `npm run test:headed`

## Troubleshooting

- Browser launch issues:
  Run the suite outside restrictive sandboxes or install browsers with `npx playwright install chromium`.
- Environment mismatches:
  Check `TEST_ENV`, `.env.local`, and any credentials injected by CI.
- Flaky selectors:
  Replace CSS-only selectors with `getByRole`, `getByLabel`, or stable test ids where possible.

## Handoff checklist

- Confirm `npm run typecheck` passes.
- Confirm the smoke suite is green in CI.
- Review the environment files with the client and remove demo credentials.
- Replace sample URLs with client application URLs.
- Add client-specific page objects, API helpers, and data factories.
- Walk the client through `fixtures/`, `pages/`, `test-data/`, and the CI workflow.
