import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export type TestEnvironment = 'qa' | 'uat' | 'prod';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface FrameworkConfig {
  environment: TestEnvironment;
  urls: {
    docs: string;
    login: string;
    practice: string;
  };
  credentials: {
    validUser: UserCredentials;
    invalidUser: UserCredentials;
  };
  browser: {
    headless: boolean;
    slowMo: number;
  };
  timeouts: {
    test: number;
    action: number;
    navigation: number;
    expect: number;
  };
}

const ROOT_DIR = process.cwd();
const DEFAULT_ENVIRONMENT: TestEnvironment = 'qa';

const DEFAULT_CONFIG: Omit<FrameworkConfig, 'environment'> = {
  urls: {
    docs: 'https://playwright.dev/',
    login: 'https://demo.guru99.com/test/login.html',
    practice: 'https://testautomationpractice.blogspot.com/',
  },
  credentials: {
    validUser: {
      username: 'user1',
      password: 'pass1',
    },
    invalidUser: {
      username: 'user2',
      password: 'wrongPass',
    },
  },
  browser: {
    headless: true,
    slowMo: 0,
  },
  timeouts: {
    test: 60_000,
    action: 15_000,
    navigation: 30_000,
    expect: 10_000,
  },
};

const configCache = new Map<TestEnvironment, FrameworkConfig>();

function parseEnvFile(filePath: string): Record<string, string> {
  const parsed: Record<string, string> = {};
  const fileContent = readFileSync(filePath, 'utf-8');

  for (const line of fileContent.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

function resolveEnvironment(rawValue = process.env.TEST_ENV): TestEnvironment {
  const normalized = rawValue?.toLowerCase();

  if (normalized === 'uat' || normalized === 'prod') {
    return normalized;
  }

  return DEFAULT_ENVIRONMENT;
}

function getEnvironmentVariables(
  environment: TestEnvironment,
): Record<string, string> {
  // Later files override earlier ones, and real process env vars win last.
  const envFiles = ['.env', `.env.${environment}`, '.env.local'].map(
    (fileName) => path.resolve(ROOT_DIR, fileName),
  );

  const fileValues = envFiles
    .filter((filePath) => existsSync(filePath))
    .reduce<Record<string, string>>((accumulator, filePath) => {
      return {
        ...accumulator,
        ...parseEnvFile(filePath),
      };
    }, {});

  const runtimeValues = Object.entries(process.env).reduce<
    Record<string, string>
  >((accumulator, [key, value]) => {
    if (typeof value === 'string') {
      accumulator[key] = value;
    }

    return accumulator;
  }, {});

  return {
    ...fileValues,
    ...runtimeValues,
  };
}

function toBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getEnvironmentConfig(
  environment = resolveEnvironment(),
): FrameworkConfig {
  const cached = configCache.get(environment);

  if (cached) {
    return cached;
  }

  const values = getEnvironmentVariables(environment);

  // The framework always returns a fully populated config object so tests
  // never need to know whether a value came from defaults or an env file.
  const config: FrameworkConfig = {
    environment,
    urls: {
      docs: values.PLAYWRIGHT_DOCS_URL ?? DEFAULT_CONFIG.urls.docs,
      login: values.LOGIN_APP_URL ?? DEFAULT_CONFIG.urls.login,
      practice: values.PRACTICE_APP_URL ?? DEFAULT_CONFIG.urls.practice,
    },
    credentials: {
      validUser: {
        username:
          values.LOGIN_USERNAME ??
          DEFAULT_CONFIG.credentials.validUser.username,
        password:
          values.LOGIN_PASSWORD ??
          DEFAULT_CONFIG.credentials.validUser.password,
      },
      invalidUser: {
        username:
          values.INVALID_LOGIN_USERNAME ??
          DEFAULT_CONFIG.credentials.invalidUser.username,
        password:
          values.INVALID_LOGIN_PASSWORD ??
          DEFAULT_CONFIG.credentials.invalidUser.password,
      },
    },
    browser: {
      headless: toBoolean(values.HEADLESS, DEFAULT_CONFIG.browser.headless),
      slowMo: toNumber(values.SLOW_MO, DEFAULT_CONFIG.browser.slowMo),
    },
    timeouts: {
      test: toNumber(values.TEST_TIMEOUT, DEFAULT_CONFIG.timeouts.test),
      action: toNumber(values.ACTION_TIMEOUT, DEFAULT_CONFIG.timeouts.action),
      navigation: toNumber(
        values.NAVIGATION_TIMEOUT,
        DEFAULT_CONFIG.timeouts.navigation,
      ),
      expect: toNumber(values.EXPECT_TIMEOUT, DEFAULT_CONFIG.timeouts.expect),
    },
  };

  configCache.set(environment, config);
  return config;
}
